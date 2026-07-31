import express from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { AdminService } from "../../service/admin.service.js";
import { ok } from "../../utils/envolve.js";
import { AppError } from "../../utils/AppError.js";
import { booleanRequires, textRequired } from "../../utils/helper.js";
import { AdminEventModel } from "../../model/events/admin-event.model.js";

const adminRoute = express.Router();

adminRoute.use(requireAuth);
adminRoute.use(requireAdmin);

// get un approved students
adminRoute.get(
  "/students",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user.faculty;

    textRequired(facultyId, "faculty id is required");

    const getUnApprovedSts = await AdminService.getUnapprovedSts(facultyId);

    res.json(
      ok({
        students: getUnApprovedSts,
      }),
    );
  }),
);

// approve students
adminRoute.patch(
  "/approve",
  asyncHandler(async (req, res) => {
    const userId = String(req.body.userId || "").trim();
    const approve = Boolean(req.body.value);

    textRequired(userId, "user id is required");
    booleanRequires(approve, "ka garna ma xa aachat na");

    const approveStudent = await AdminService.approveStudents(userId, approve);

    res.json(
      ok({
        user: approveStudent.success,
        message: approveStudent.action,
      }),
    );
  }),
);

//get events
adminRoute.get(
  "/event",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user.faculty;

    textRequired(facultyId, "faculty id is required");

    const getEvents = await AdminEventModel.getEvents(facultyId);

    res.json(
      ok({
        events: getEvents,
      }),
    );
  }),
);

//approve event
adminRoute.patch(
  "/event/:status",
  asyncHandler(async (req, res) => {
    const eventId = String(req.body.eventId || "").trim();
    const status = Boolean(req.params.approve);
    textRequired(eventId, "eventId id is required");
    booleanRequires(status, "status boolean is required");

    const update = AdminEventModel.approveEvent(eventId, status);

    res.json(
      ok({
        message: status
          ? "The event has be aproved"
          : "The event have been rejected",
        event: update,
      }),
    );
  }),
);
