import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";

export const facultyRoute = Router();

facultyRoute.use(requireAuth);
