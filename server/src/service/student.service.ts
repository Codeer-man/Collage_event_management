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

  //create or update event
  async saveEvent(
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
    locatoin_type: string,
    location_name: string,
    is_team_event?: boolean,
    max_participants?: number,
    eventId?: string,
  ) {
    if (eventId) {
      return await pool.query(
        `
      UPDATE events
      SET
        title=$1,
        description=$2,
        location_id=$3,
        event_date=$4,
        registration_deadline=$5,
        entry_fee=$6,
        contact=$7,
        image_url=$8,
        public_id=$9,
        is_team_event=$10,
        max_participants=$11,
        updated_at=NOW()
      WHERE id=$12
        end_at=$13,
        location_type=$14,
        location_name = $15
      RETURNING *;
      `,
        [
          title,
          description,
          location_id,
          event_date,
          registration_deadline,
          entry_fee,
          contact,
          image_url,
          public_id,
          is_team_event,
          max_participants,
          eventId,
          end_at,
          locatoin_type,
          location_name,
        ],
      );
    }

    return await pool.query(
      `
    INSERT INTO events(
      title,
      description,
      location_id,
      event_date,
      registration_deadline,
      entry_fee,
      contact,
      image_url,
      public_id,
      created_by,
      is_team_event,
      max_participants,
      end_at,
      location_type,
      location_name
    )
    VALUES(
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
    )
    `,
      [
        title,
        description,
        location_id,
        event_date,
        registration_deadline,
        entry_fee,
        contact,
        image_url,
        public_id,
        created_by,
        is_team_event,
        max_participants,
        end_at,
        locatoin_type,
        location_name,
      ],
    );
  },
};
