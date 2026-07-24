import express from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { AdminService } from "../../service/admin.service.js";
import { ok } from "../../utils/envolve.js";
import { AppError } from "../../utils/AppError.js";
import { booleanRequires, textRequired } from "../../utils/helper.js";

const adminRoute = express.Router();

adminRoute.use(requireAuth);
adminRoute.use(requireAdmin);

// get un approved students
adminRoute.get(
  "/students",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user;

    const getUnApprovedSts = await AdminService.getUnapprovedSts(facultyId);

    if (getUnApprovedSts.length === 0) {
      throw new AppError(200, "All students are approved");
    }

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
