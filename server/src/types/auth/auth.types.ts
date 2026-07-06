import { uuid } from "../global.type.js";

export type roles = "administrative" | "admin" | "user" | "organizer";

export type authTable = {
  id: uuid;
  full_name: string;
  email: string;
  password: string;
  role: roles;
  facultyId: uuid;
  image_url: string;
  public_id: string;
  contact_number: string;
  is_email_verified: boolean;
  is_approved_student: boolean;
  crearted_at: Date;
  updated_atr: Date;
};
