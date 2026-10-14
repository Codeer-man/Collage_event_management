export type locationType = "internal" | "external";

export interface joinEventType {
  id: number;
  image_url: string;
  title: string;
  description: string;
  location_name: string;
  event_date: string;
  registration_deadline: string;
  max_participants: number;
  end_at: string;
  location_type: string;
  is_team_event: string;
  entry_fee: number;
  status: string;
  contact: string;
  team_name?: string;
}

export interface joinEventRes {
  events: joinEventType[];
}

export type CreateEventFormData = {
  title: string;
  description: string;
  location_id?: string;
  location_type: locationType;
  location_name?: string;
  event_date: string;
  end_at: string;
  registration_deadline: string;
  entry_fee: number;
  contact: number;
  max_participants: number;
  isTeamEvent: boolean;
  file: File | null;
  faculty: string[];
};

export type location = {
  id: string;
  name: string;
};
export type locationRes = {
  location: location[];
};

export type CreateEventPayload = {
  id?: string;
  title: string;
  description: string;
  location_type: locationType;
  location_id: string;
  location_name?: string;
  event_date: string;
  end_at: string;
  registration_deadline: string;
  entry_fee: number;
  contact: number;
  max_participants: number;
  isTeamEvent: boolean;
  eventId?: string;
  faculty: string[];
  file?: File | null;
};

export type myEventType = {
  id?: string;
  title: string;
  description: string;
  location_name: string;
  event_date: string;
  end_at: string;
  registration_deadline: string;
  entry_fee: number;
  contact: number;
  max_participants: number;
  is_team_event: boolean;
  creawted_by: string;
  image_url: string;
  status: string;
};
export type myEventTypeResp = {
  myEvent: myEventType[];
};

export interface TeamMember {
  id: number;
  user_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  joined_at: string;
}

export interface TeamType {
  id: string;
  event_id: string;
  leader_id: string;
  team_name: string;
  members: TeamMember[];
  created_at: string;
  title: string;
  image_url: string;
}

export interface TeamResp {
  teams: TeamType[];
}
