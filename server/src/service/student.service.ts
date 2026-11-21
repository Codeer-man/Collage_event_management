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
  // async updateEvent(
  //   title: string,
  //   description: string,
  //   location_id: string,
  //   location_type: string,
  //   location_name: string,
  //   event_date: string,
  //   end_at: string,
  //   registration_deadline: string,
  //   entry_fee: number,
  //   contact: number,
  //   image_url: string | null,
  //   public_id: string | null,
  //   is_team_event: boolean,
  //   max_participants: number,
  //   eventId: string,
  //   userId: string,
  // ) {
  //   return await pool.query(
  //     `
  //   UPDATE events
  //   SET
  //     title = $1,
  //     description = $2,
  //     location_id = $3,
  //     location_type = $4,
  //     location = $5,
  //     event_date = $6,
  //     end_at = $7,
  //     registration_deadline = $8,
  //     entry_fee = $9,
  //     contact = $10,
  //     image_url = COALESCE($11, image_url),
  //     public_id = COALESCE($12, public_id),
  //     is_team_event = $13,
  //     max_participants = $14,
  //     updated_at = NOW()
  //   WHERE id = $15
  //   AND created_by = $16
  //   RETURNING id
  //   `,
  //     [
  //       title,
  //       description,
  //       location_id,
  //       location_type,
  //       location_name,
  //       event_date,
  //       end_at,
  //       registration_deadline,
  //       entry_fee,
  //       contact,
  //       image_url,
  //       public_id,
  //       is_team_event,
  //       max_participants,
  //       eventId,
  //       userId,
  //     ],
  //   );
  // },
};
