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
    const programCode = String(req.body.programCode || "").trim();

    textRequired(faculty, "Faculty name is required");
    textRequired(programCode, "program code is required");

    const findFaculty = await facultyService.findFacultyByName(faculty);
    if (findFaculty) {
      throw new AppError(500, "faculty name already exists");
    }

    const createFaculty = await facultyModel.createFaculty(
      faculty,
      programCode.toUpperCase(),
    );

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
    const faculty = await facultyModel.getAllFacultyForAdministrative();

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

    const findFauclty = await facultyModel.findFaculty("faculty_name", faculty);
    if (findFauclty) {
      throw new AppError(401, "Faculty already exists");
    }

    await facultyModel.updateFacultyName(facultyId, faculty);

    res.json(
      ok({
        message: "Faculty name has been updated",
      }),
    );
  }),
);

//get user for admin role
superRoute.get(
  "/user/:facultyId",
  asyncHandler(async (req, res) => {
    const facultyId = String(req.params.facultyId || "").trim();
    const search = String(req.query.search || "").trim();

    textRequired(facultyId, "faculty id not found");

    const user = await UserModel.adminUser(facultyId, search);

    res.json(
      ok({
        user,
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
