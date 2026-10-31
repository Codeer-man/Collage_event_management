import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as notiService from "../../service/notification.service.js";
import { ok } from "../../utils/envolve.js";
import { numberRequires } from "../../utils/helper.js";

export const notiRoute = express.Router();

notiRoute.use(requireAuth);

//get all notification
notiRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const notifications = await notiService.receiveNotification(userId);

    res.json(ok({ notification: notifications }));
  }),
);

//read notification
notiRoute.get(
  "/read/:notiId",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const notiId = Number(req.params.notiId);

    numberRequires(notiId, "Notification id is provided");

    const noti = await notiService.readNoti(userId, notiId);

    res.json(ok({ notification: noti }));
  }),
);

// delete notification
notiRoute.delete(
  "/delete/:notiId",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const notiId = Number(req.params.notiId);

    if (Number.isNaN(notiId)) {
      await notiService.deleteAllReadNotifications(userId);
      res.json(ok({ success: true }));
      return;
    }

    await notiService.deleteNotification(userId, notiId);

    res.json(ok({ success: true }));
  }),
);
