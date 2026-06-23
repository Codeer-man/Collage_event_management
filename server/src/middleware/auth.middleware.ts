import type { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../lib/token.js";
import asyncHandler from "../utils/asyncHandler.js";
import { UserModel } from "../model/user.model.js";
import { requireFound } from "../utils/helper.js";
import { AppError } from "../utils/AppError.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1].trim();
    } else if (req.cookies.accessToken) {
      token = String(req.cookies.accessToken).trim();
    }

    if (!token || token.trim() === "") {
      throw new AppError(400, "You are not authenticated");
    }

    let claims = verifyAccessToken(token);
    console.log(claims.payload.id);

    const user = await UserModel.findByField("id", claims.payload.id);

    const foundUser = requireFound(user, "User doesnot exists");

    (req as any).user = {
      id: foundUser.id,
      role: foundUser.role,
      isEmailVerified: foundUser.is_email_verified,
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

export const reqireAdmin = asyncHandler(async (req, _res, next) => {
  const userId = (req as any).userId;

  const user = await UserModel.findByField("id", userId);

  const existingUser = requireFound(user, "User not found");

  if (existingUser.role !== "admin") {
    throw new AppError(403, "Admin access only");
  }

  next();
});
