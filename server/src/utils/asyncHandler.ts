/**
 * wrapper function that handle async function
 * catches error automatically and send to the error middleware
 * prevent long and continuous try/catch block
 */

import type { Request, Response, NextFunction } from "express";

export default function asyncHandler(
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>, // accepts another async function as parameter
) {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
}
