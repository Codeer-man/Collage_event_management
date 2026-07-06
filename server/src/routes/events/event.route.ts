import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";
import asyncHandler from "../../utils/asyncHandler.js";
import { textRequired } from "../../utils/helper.js";
import { AppError } from "../../utils/AppError.js";

export const eventRoute = express.Router();

eventRoute.use(requireAuth);

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

// create event by studnet and admin
eventRoute.post(
  "/create",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const user = (req as any).user;

    const eventName = String(req.body.eventName || "").trim();
    const description = String(req.body.description || "").trim();
    const location = String(req.body.location || "").trim();
    const entryFee = Number(req.body.entryFee || 0);
    const pricePool = String(req.body.pricePool);
    const startDate = String(req.body.startDate);
    // end date
    const status = String(req.body.status || "upcoming").trim();
    const faculty = String(req.body.faculty);
    const file = req.file as Express.Multer.File;

    if (!user) {
      throw new AppError(500, "not authenticated or user id not received");
    }
    textRequired(eventName, "event name is required");
    textRequired(description, "description requried");
    textRequired(location, "location requried");
    textRequired(pricePool, "price pool requried");
    textRequired(startDate, "start date is requried");
    textRequired(faculty, "allowed faculty are required");
  }),
);
