export type student = {
  id: string;
  full_name: string;
  email: string;
  image_url: string;
  contact_number: string;
  is_approved_student: boolean;
};

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StudentResp {
  students: student[];
  pagination: Pagination;
}

export type unApprovedSts = {
  id: string;
  full_name: string;
  email: string;
  image_url: string;
  contact_number: string;
  status: boolean;
  is_email_verified: boolean;
};
export type unApprovedRes = {
  students: unApprovedSts[];
};

export type event = {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: Date;
  registration_deadline: Date;
  created_by: string;
  status: string;
  is_team_event: boolean;
  max_participants: number;
  image_url: string;
  public_id: string;
  contact: number;
  entry_fee: number;
  organizer_name: string;
  pp: string;
};

export type eventRes = {
  events: event[];
};
