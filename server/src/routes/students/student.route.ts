import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { numberRequires, textRequired } from "../../utils/helper.js";
import { ok } from "../../utils/envolve.js";
import { studentService } from "../../service/student.service.js";
import { AppError } from "../../utils/AppError.js";
import { UserModel } from "../../model/auth/user.model.js";
import { UserEventModel } from "../../model/events/user-event.model.js";
export const userRoute = express.Router();

userRoute.use(requireAuth);

// get events
userRoute.get(
  "/events",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user.facultyId;

    textRequired(facultyId, "Faculty id is reqiured");

    const events = await studentService.getAllEvents(facultyId);

    res.json(
      ok({
        events,
      }),
    );
  }),
);

// join single events events
userRoute.post(
  "/event/singlew",
  asyncHandler(async (req, res) => {
    const user = (req as any).user;
    const eventId = Number(req.body.eventId);
    const userId = user.id;
    numberRequires(400, "EventId is requierd");
    textRequired(404, "user id not found");

    const joinEvent = UserEventModel.joinSingleEvent(eventId, userId);

    if (!joinEvent) {
      throw new AppError(500, "event join failed");
    }

    res.json(
      ok({
        status: "success",
        joinEvent,
      }),
    );
  }),
);

//join team event
// userRoute.post(
//   "/event/:team",
//   asyncHandler(async (req, res) => {
//     const user = (req as any).user;
//     const eventId = Number(req.body.eventId);
//     const team = +req.params.team;
//     const userId = user.id;
//     numberRequires(eventId, "EventId is requierd");
//     numberRequires(team, "team is requierd");
//     textRequired(userId, "user id not found");

//     // check if the team exists
//     const checkTeam = await UserEventModel.teamExistance(team);

//     if (!checkTeam) {
//       throw new AppError(400, "team does not exists");
//     }
//   }),
// );
