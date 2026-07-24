import type { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../lib/token.js";
import asyncHandler from "../utils/asyncHandler.js";
import { UserModel } from "../model/auth/user.model.js";
import { requireFound } from "../utils/helper.js";
import { AppError } from "../utils/AppError.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let token: string | undefined;

    if (req.cookies?.accessToken) {
      token = String(req.cookies.accessToken).trim();
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1].trim();
    }

    if (!token || token.trim() === "") {
      throw new AppError(400, "You are not authenticated");
    }

    let claims = verifyAccessToken(token);

    const user = await UserModel.findByField("id", claims.payload.id);

    const foundUser = requireFound(user, "User doesnot exists");

    (req as any).user = {
      id: foundUser.id,
      email: foundUser.email,
      full_name: foundUser.full_name,
      faculty: foundUser.faculty_id,
      image_url: foundUser.image_url,
      role: foundUser.role,
      is_email_verified: foundUser.is_email_verified,
      is_approved_student: foundUser.is_approved_student,
    };

    next();
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const requireAdmin = asyncHandler(async (req, _res, next) => {
  const user = (req as any).user;

  const findUser = await UserModel.findByField("id", user.id);

  const existingUser = requireFound(findUser, "User not found");

  if (existingUser.role !== "admin") {
    throw new AppError(403, "Admin access only");
  }

  next();
});

export const requireAdministrative = asyncHandler(async (req, _res, next) => {
  const user = (req as any).user;

  const findUser = await UserModel.findByField("id", user.id);

  const existingUser = requireFound(findUser, "User not found");

  if (existingUser.role !== "administrative") {
    throw new AppError(403, "administrative access only");
  }

  next();
});
