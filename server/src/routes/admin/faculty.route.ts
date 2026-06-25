import { Router } from "express";
import { type Request, type Response } from "express";
import { reqireAdmin, requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireFound, textRequired } from "../../utils/helper.js";
import { facultyModel } from "../../model/admin/faculty.model.js";
import { AppError } from "../../utils/AppError.js";
import { ok } from "../../utils/envolve.js";
import { findAdmin } from "../../service/auth.js";

export const facultyRoute = Router();

facultyRoute.use(requireAuth);

// get all faculty
facultyRoute.get(
  "/faculty",
  asyncHandler(async (_req, res) => {
    const faculty = await facultyModel.getAllFaculty();

    const foundFaculty = requireFound(faculty, "faculty not found");

    res.json(ok({ faculty: foundFaculty }));
  }),
);

// create faculty
facultyRoute.post(
  "/faculty/create",
  reqireAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const faculty = String(req.body.faculty || "").trim();

    textRequired(faculty, "faculty name is required");
    if (!userId) {
      throw new AppError(429, "You are not authenticated");
    }

    const admin = await findAdmin(userId.id);

    const existingFaculty = await facultyModel.findFaculty(
      "faculty_name",
      faculty,
    );

    if (existingFaculty) {
      throw new AppError(400, "faculty already exists");
    }

    const createFaculty = await facultyModel.createFaculty(
      faculty,
      admin.full_name,
    );

    res.json(
      ok({
        message: "new faculty has been created",
        faculty: createFaculty,
      }),
    );
  }),
);

// faculty update
facultyRoute.patch(
  "/faculty/update",
  asyncHandler(async (req, res) => {
    const facultyId = String(req.body.facultyId).trim();
    const faculty = String(req.body.faculty || "");

    textRequired(facultyId, "faculty id is required");
    textRequired(faculty, "faculty name is require");

    const findFaculty = await facultyModel.findFaculty("id", facultyId);

    requireFound(findFaculty, "faculty not found");

    await facultyModel.updateFacultyName(facultyId, faculty);

    res.json(
      ok({
        message: "faculty name updated successfully",
      }),
    );
  }),
);
