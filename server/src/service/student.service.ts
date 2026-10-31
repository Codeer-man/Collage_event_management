import { pool } from "../config/pool.js";
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

  //create event
  async createEvent(
    title: string,
    description: string,
    location_id: string,
    event_date: string,
    end_at: string,
    registration_deadline: string,
    entry_fee: number,
    contact: number,
    image_url: string,
    public_id: string,
    created_by: string,
    location_type: string,
    location_name: string,
    is_team_event?: boolean,
    max_participants?: number,
  ) {
    return await pool.query(
      `
    INSERT INTO events (
      title,
      description,
      location_id,
      event_date,
      end_at,
      registration_deadline,
      entry_fee,
      contact,
      image_url,
      public_id,
      created_by,
      location_type,
      location_name,
      is_team_event,
      max_participants
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    RETURNING *;
    `,
      [
        title,
        description,
        location_id,
        event_date,
        end_at,
        registration_deadline,
        entry_fee,
        contact,
        image_url,
        public_id,
        created_by,
        location_type,
        location_name,
        is_team_event,
        max_participants,
      ],
    );
  },

  // update event
  async updateEvent(
    eventId: string,
    title: string,
    description: string,
    location_id: string,
    event_date: string,
    end_at: string,
    registration_deadline: string,
    entry_fee: number,
    contact: number,
    image_url: string,
    public_id: string,
    location_type: string,
    location_name: string,
    is_team_event?: boolean,
    max_participants?: number,
  ) {
    return await pool.query(
      `
    UPDATE events
    SET
      title = $1,
      description = $2,
      location_id = $3,
      event_date = $4,
      end_at = $5,
      registration_deadline = $6,
      entry_fee = $7,
      contact = $8,
      image_url = $9,
      public_id = $10,
      location_type = $11,
      location_name = $12,
      is_team_event = $13,
      max_participants = $14,
      updated_at = NOW()
    WHERE id = $15
    RETURNING *;
    `,
      [
        title,
        description,
        location_id,
        event_date,
        end_at,
        registration_deadline,
        entry_fee,
        contact,
        image_url,
        public_id,
        location_type,
        location_name,
        is_team_event,
        max_participants,
        eventId,
      ],
    );
  },
};
