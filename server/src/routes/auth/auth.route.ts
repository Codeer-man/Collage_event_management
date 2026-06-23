import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireFound, textRequired } from "../../utils/helper.js";
import { AppError } from "../../utils/AppError.js";
import { UserModel } from "../../model/user.model.js";
import { comaprePassword, hashPassword } from "../../lib/hash.js";
import { ok } from "../../utils/envolve.js";
import { getUrl } from "../../lib/getUrl.js";
import crypto from "crypto";
import {
  createAccessToken,
  createVerifyToken,
  verifyToken,
} from "../../lib/token.js";
import { sendEmail } from "../../lib/sendEmail.js";
import { facultyModel } from "../../model/admin/faculty.model.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";
import { uploadImage } from "../../utils/cloudinary.js";

export const authRoute = Router();

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fieldSize: 5 * 1024 * 1024,
    files: 1,
  },
});

// user register account
authRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const fullName = String(req.body.fullName).trim();
    const email = String(req.body.email).trim();
    const password = String(req.body.password).trim();
    const faculty = String(req.body.faculty || "").trim();
    const contactNumber = String(req.body.contactNumber || "").trim();
    const file = req.file as Express.Multer.File;

    textRequired(fullName, "Full name is required");
    textRequired(email, "email is required");
    textRequired(password, "password is required");
    textRequired(faculty, "faculty is required");
    textRequired(contactNumber, "contact number is required");

    if (password.length < 6) {
      throw new AppError(400, "Password must be 6 character long");
    }

    const exisitingUser = await UserModel.findByField("email", email);

    if (exisitingUser) {
      throw new AppError(400, "Email already exist please try different email");
    }

    const findFaculty = await facultyModel.findFaculty("faculty", faculty);

    const existingFaculty = requireFound(findFaculty, "faculty not found");

    const imageUpload = await uploadImage(file.buffer, "profile_publicId");

    const passwordHash = await hashPassword(password);

    const newlyCreatedUser = await UserModel.create({
      full_name: fullName,
      email: email,
      password: passwordHash,
      role: "student",
      faculty_id: existingFaculty.id,
      image_url: imageUpload.url,
      public_id: imageUpload.public_id,
      contact_number: contactNumber,
      is_email_verified: false,
    });

    //verify email using nodemailer
    const verifyToken = createVerifyToken(newlyCreatedUser.id);

    const verifyUrl = `${getUrl()}/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail({
      to: newlyCreatedUser.email,
      subject: "verify your Email",
      html: `
    <p>Pleaes verify your email </p> </br>
    <p><a href="${verifyUrl}"> ${verifyUrl} <a/> <p/>
    `,
    });

    res.json(
      ok({
        user: {
          id: newlyCreatedUser.id,
          email: newlyCreatedUser.email,
          // isEmailVerified: newlyCreatedUser.,
        },
      }),
    );
  }),
);

//user login
authRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || "").trim();
    const password = String(req.body.password || "").trim();

    textRequired(email, "Email is requried");
    textRequired(password, "Password is required");

    const user = await UserModel.findByField("email", email);

    const exisitingUser = requireFound(user, "user does not exist", 404);

    const pwd = await comaprePassword(password, exisitingUser.password);

    if (!pwd) {
      throw new AppError(400, "Password does not match");
    }

    //verify email using resend if the email is not verified
    if (user.is_email_verified === false) {
      const verifyToken = createVerifyToken(user.id);

      const verifyUrl = `${getUrl()}/api/auth/verify-email?token=${verifyToken}`;

      await sendEmail({
        to: user.email,
        subject: "verify your Email",
        html: `
    <p>Pleaes verify your email </p> </br>
    <p><a href="${verifyUrl}"> ${verifyUrl} <a/> <p/>
    `,
      });

      res.json(
        ok({
          message:
            "Please verify your email first link has been sent to your email",
        }),
      );
    }

    //create jwt accessToken to stay logged in every refresh using cookies
    const accessToken = createAccessToken(user.id, user.role);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json(
      ok({
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isEmailVerified: user.is_email_verified,
        },
      }),
    );
  }),
);

//verify email
authRoute.get(
  "/verify-email",
  asyncHandler(async (req, res) => {
    const token = String(req.query.token || "").trim();

    textRequired(token, "Token not found in the url");

    const payload = verifyToken(token);
    console.log(payload, "payload");

    const verifyUser = await UserModel.emailVerified(String(payload.id));
    console.log(verifyUser, "user");

    requireFound(verifyUser, "User does not exists");

    res.json(
      ok({
        message: "User verified",
      }),
    );
  }),
);

//logout user
authRoute.get(
  "/auth/logout",
  requireAuth,
  asyncHandler(async (_req, res) => {
    res.clearCookie("accessToken", { path: "/" });

    res.json(
      ok({
        message: "User logged out successgully",
      }),
    );
  }),
);

//checkAuth
authRoute.get(
  "/check-auth",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as any).user;
    console.log(user, "user");

    res.json(
      ok({
        message: "You are authenticated",
        user,
      }),
    );
  }),
);
