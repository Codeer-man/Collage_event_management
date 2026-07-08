import { role, uuid } from "../global.types.js";

export interface User {
  id: uuid;
  full_name: string;
  email: string;
  password: string;
  role: role;
  faculty_id: uuid;
  image_url: string;
  public_id: string;
  contact_number: string;
  is_email_verified: boolean;
  is_approved_student: boolean;
  created_at: Date;
  updated_at: Date;
}
