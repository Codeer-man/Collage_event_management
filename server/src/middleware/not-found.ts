import type { Request, Response } from "express";
import { fail } from "../utils/envolve.js";

export function notfound(req: Request, res: Response) {
  res.status(404).json(fail(`Route not found ${req.method}`));
}
