export type facluty = {
  id: string;
  faculty_name: string;
  user_id: string | null;
  created_at: Date;
};

export type createFacultyForm = {
  faculty: string;
  programCode: string;
};

export type GetAllFaculty = {
  id: string;
  faculty_name: string;
  program_code: string;
  admin_id: string | null;
  full_name: string | null;
  image_url: string | null;
  contact_number: string | null;
};

export type getAllFacultyRes = {
  faculty: GetAllFaculty[];
};

export type updateFacultyBody = {
  facultyId: string;
  faculty: string;
  programCode: string;
};

export type getUser = {
  search: string;
  facultyId: string;
};

export type AssignAdminResponse = {
  user: {
    id: string;
    full_name: string;
    email: string;
    image_url: string;
  }[];
};

export type User = {
  id: string;
  full_name: string;
  email: string;
  image_url: string;
};
