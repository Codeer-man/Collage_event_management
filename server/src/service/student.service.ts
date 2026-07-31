import { EventModel } from "../model/events/event.model.js";
import { AppError } from "../utils/AppError.js";

export const studentService = {
  async getAllEvents(facultyId: string) {
    const events = await EventModel.getEvents(facultyId);

    if (events.length < 0) {
      throw new AppError(201, "Not event present ");
    }

    return events;
  },
};
