export interface joinEventType {
  id: number;
  image_url: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  is_team_event: string;
  status: string;
  contact: string;
  team_name?: string;
}

export interface joinEventRes {
  events: joinEventType[];
}

export type CreateEventPayload = {
  id?: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
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
  location: string;
  event_date: string;
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
