import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireFound, textRequired } from "../../utils/helper.js";

import { UserModel } from "../../model/auth/user.model.js";

import { ok } from "../../utils/envolve.js";

import { createVerifyToken, verifyToken } from "../../lib/token.js";

import { requireAuth } from "../../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";

import { AuthService } from "../../service/auth.service.js";
import { AppError } from "../../utils/AppError.js";
import { facultyModel } from "../../model/faculty/faculty.model.js";
import { frontendUrl, getUrl } from "../../lib/getUrl.js";
import { pool } from "../../config/pool.js";
import { hashPassword } from "../../lib/hash.js";
import { sendEmail } from "../../lib/sendEmail.js";

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
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const full_name = String(req.body.full_name).trim();
    const email = String(req.body.email).trim();
    const password = String(req.body.password).trim();
    const faculty_id = String(req.body.faculty_id || "").trim();
    const contact_number = String(req.body.contact_number || "").trim();
    const file = req.file as Express.Multer.File;

    textRequired(full_name, "Full name is required");
    textRequired(email, "email is required");
    textRequired(password, "password is required");
    textRequired(faculty_id, "faculty id is required");
    textRequired(contact_number, "contact number is required");

    const newlyCreatedUser = await AuthService.register(req.body, file);

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

    const result = await AuthService.login(email, password);

    if (!result.user) {
      throw new AppError(500, "Authentication failed unexpectedly");
    }

    // Handle unverified email
    if (!result.verified) {
      res.json(
        ok({ message: "Please verify your email first. Link has been sent." }),
      );
      return;
    }

    const isProd = process.env.NODE_ENV === "production";

    // Set HTTP-only cookie
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd, // true in production, false in development
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json(
      ok({
        accessToken: result.accessToken,
        user: {
          id: result.user.id,
          full_name: result.user.full_name,
          image_url: result.user.image_url,
          email: result.user.email,
          role: result.user.role,
          isEmailVerified: result.user.is_email_verified,
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

    const verifyUser = await UserModel.emailVerified(String(payload.id));

    requireFound(verifyUser, "User does not exists");

    res.redirect(frontendUrl());
  }),
);

//logout user
authRoute.get(
  "/logout",
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

    res.json(
      ok({
        message: "You are authenticated",
        user,
      }),
    );
  }),
);

authRoute.get(
  "/faculty",
  asyncHandler(async (_req, res) => {
    const fauclty = await facultyModel.getAllFaculty();

    res.json(
      ok({
        faculty: fauclty,
      }),
    );
  }),
);

//forget-pwd send email
authRoute.post(
  "/forget-pwd/send-email",
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || "").trim();

    textRequired(email, "Email is required");

    const user = await UserModel.findByField("email", email);

    if (!user) {
      throw new AppError(201, "Email has been sent.Please check your gmail");
    }
    const token = createVerifyToken(user.id);

    await sendEmail({
      html: ` <a
          href="${frontendUrl()}/forget-password/${token}"
          style="display:inline-block;margin-top:12px;padding:10px 22px;
          background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;"
        >
          Verify Email
        </a> `,
      subject: `Forget password email`,
      to: email,
    });

    res.json(
      ok({
        message: "Email has been sent.Please check your email",
      }),
    );
  }),
);

//forget-pwd
authRoute.put(
  "/forget-pwd",
  asyncHandler(async (req, res) => {
    const newPassword = String(req.body.password || "").trim();
    const token = String(req.body.token || "").trim();
    textRequired(newPassword, "Please prodive new password");
    textRequired(token, "token is required");

    const payload = verifyToken(token);

    const user = await UserModel.findByField("id", payload.id);

    if (!user) {
      throw new AppError(404, "User does not exists");
    }

    const passwordHash = await hashPassword(newPassword);

    await pool.query(
      `
    UPDATE users
    SET password = $1 
    WHERE id = $2
    `,
      [passwordHash, user.id],
    );

    res.json(ok({ message: "Password successfully updated" }));
  }),
);
