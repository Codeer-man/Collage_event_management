export interface joinEventType {
  id: string;
  image_url: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  is_team_event: string;
  status: string;
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
