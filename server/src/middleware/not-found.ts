import type { Request, Response } from "express";
import { fail } from "node:assert";

export function notfound(req: Request, res: Response) {
  res.status(404).json(fail(`Route not found ${req.method}`));
}
