export type ApiErrorItem = {
  message: string;
  code?: string;
};

export type ApiEnvolve<T> = {
  status: "success" | "error";
  data: T | null;
  meta?: Record<string, unknown>;
  errors?: ApiErrorItem;
};

export type UserRole = "student" | "admin" | "organizer" | "administrative";
export type uuid = string & { readonly __brand: unique symbol };

export type AppUser = {
  id: uuid;
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  faculty_id: uuid;
  image_url: string;
  public_id: string;
  contact_number: string;
  is_email_verified: boolean;
  is_approved_student: boolean;
};
