import { Router } from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { AdminService } from "../../service/admin.service.js";
import { ok } from "../../utils/envolve.js";
import { AppError } from "../../utils/AppError.js";
import { booleanRequires, textRequired } from "../../utils/helper.js";
import { AdminEventModel } from "../../model/events/admin-event.model.js";
import { pool } from "../../config/pool.js";

export const adminRoute = Router();

adminRoute.use(requireAuth);
adminRoute.use(requireAdmin);

//get all students

adminRoute.get(
  "/students",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user.faculty;

    // Pagination
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);

    const offset = (page - 1) * limit;

    // Search
    const search = String(req.query.search || "").trim();

    const searchTerm = `%${search}%`;

    // Get students
    const studentsResult = await pool.query(
      `
      SELECT *
      FROM users
      WHERE faculty_id = $1
        AND (
          full_name ILIKE $2
          OR email ILIKE $2
        )
        AND role = 'student'
      ORDER BY created_at DESC
      LIMIT $3
      OFFSET $4
      `,
      [facultyId, searchTerm, limit, offset],
    );

    // Get total number of students
    const countResult = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM users
      WHERE faculty_id = $1
        AND (
          full_name ILIKE $2
          OR email ILIKE $2
        )
      `,
      [facultyId, searchTerm],
    );

    const total = Number(countResult.rows[0].total);

    const totalPages = Math.ceil(total / limit);

    res.json(
      ok({
        students: studentsResult.rows,

        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      }),
    );
  }),
);

// get un approved students
adminRoute.get(
  "/notApproved",
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

    const approveStudent = await AdminService.approveStudents(userId, approve);

    res.json(
      ok({
        user: approveStudent.success,
        message: approveStudent.action,
      }),
    );
  }),
);

//get pending events
adminRoute.get(
  "/event/pending",
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

//get all events
adminRoute.get(
  "/events",
  asyncHandler(async (req, res) => {
    const facultyId = String((req as any).user.faculty);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const faculty = await pool.query(
      `
      SELECT e.* FROM events e
      JOIN users u on e.created_by
      WHERE u.faculty_id = $1
      ORDER BY created_at desc
      LIMIT $2
      OFFSET $3
      `,
      [facultyId, limit, offset],
    );

    res.json(
      ok({
        faculty,
      }),
    );
  }),
);

//approve event
adminRoute.patch(
  "/event/",
  asyncHandler(async (req, res) => {
    const eventId = String(req.body.eventId || "").trim();
    const status = Boolean(req.body.status);
    textRequired(eventId, "eventId id is required");

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
