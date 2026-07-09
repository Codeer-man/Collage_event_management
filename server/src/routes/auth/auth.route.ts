import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireFound, textRequired } from "../../utils/helper.js";

import { UserModel } from "../../model/auth/user.model.js";

import { ok } from "../../utils/envolve.js";

import { verifyToken } from "../../lib/token.js";

import { requireAuth } from "../../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";

import { AuthService } from "../../service/auth.service.js";
import { AppError } from "../../utils/AppError.js";

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

    res.json(
      ok({
        message: "You are authenticated",
        user,
      }),
    );
  }),
);
