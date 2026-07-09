import { Router } from "express";
import {
  requireAdministrative,
  requireAuth,
} from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { textRequired } from "../../utils/helper.js";
import { facultyModel } from "../../model/faculty/faculty.model.js";
import { ok } from "../../utils/envolve.js";
import { facultyService } from "../../service/faculty.service.js";
import { AppError } from "../../utils/AppError.js";
import { AdministrativeService } from "../../service/administrative.service.js";
import { UserModel } from "../../model/auth/user.model.js";

export const superRoute = Router();

superRoute.use(requireAuth);
superRoute.use(requireAdministrative);

// create faculty
superRoute.post(
  "/faculty/create",
  asyncHandler(async (req, res) => {
    const faculty = String(req.body.faculty || "").trim();

    textRequired(faculty, "Faculty name is required");

    const findFaculty = await facultyService.findFacultyByName(faculty);
    if (findFaculty) {
      throw new AppError(500, "faculty name already exists");
    }

    const createFaculty = await facultyModel.createFaculty(faculty);

    res.json(
      ok({
        message: "New faculty has been created successfully",
        faculty: createFaculty,
      }),
    );
  }),
);

//get all faculty
superRoute.get(
  "/faculty",
  asyncHandler(async (_req, res) => {
    const faculty = await facultyModel.getAllFaculty();

    res.json(
      ok({
        faculty: faculty,
      }),
    );
  }),
);

// update faculty
superRoute.patch(
  "/faculty/edit",
  asyncHandler(async (req, res) => {
    const faculty = String(req.body.faculty || "").trim();
    const facultyId = String(req.body.facultyId || "").trim();
    textRequired(faculty, "Faculty name is required");
    textRequired(facultyId, "Faculty id is required");

    await facultyModel.updateFacultyName(facultyId, faculty);

    res.json(
      ok({
        message: "Faculty name has been updated",
      }),
    );
  }),
);

//asign admin
superRoute.patch(
  "/asign/faculty",
  asyncHandler(async (req, res) => {
    const userId = (req.body.userId || "").trim();
    const facultyId = String(req.body.facultyId || "").trim();

    textRequired(userId, "user id is required");
    textRequired(facultyId, "faculty id is required");

    const asignAdmin = await AdministrativeService.asignFaculty(
      userId,
      facultyId,
    );

    res.json(
      ok({
        message: "Faculty admin has been asigned",
        asignAdmin,
      }),
    );
  }),
);

// change admin :under development
superRoute.patch(
  "/admin/change",
  asyncHandler(async (req, res) => {}),
);
