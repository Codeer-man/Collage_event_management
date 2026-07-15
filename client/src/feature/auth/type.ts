import type { AppUser, uuid } from "../../lib/type";

export type createUser = {
  full_name: string;
  email: string;
  password: string;
  faculty_id: string;
  contact_number: string;
  file: File | null;
};

export type loginUser = {
  email: string;
  password: string;
};

export interface createuserRes {
  id: uuid;
  is_email_verified: boolean;
  email: string;
}

export type loginUserRes = {
  user: AppUser;
};

export type checkAuthResp = {
  message: string;
  user: AppUser;
};

export type faculty = {
  id: string;
  faculty_name: string;
};

export type allFaculty = {
  faculty: faculty[];
};

// form
export type registerUserFormBody = {
  full_name: string;
  email: string;
  password: string;
  faculty_id: string;
  contact_number: string;
  file: File | null;
};

export type loginUserFormBody = {
  email: string;
  password: string;
};
