import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { fail } from "node:assert";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(fail(error.message));
  }

  console.error(error);

  return res.status(500).json();
}
