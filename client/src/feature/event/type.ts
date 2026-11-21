export type eventDetail = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: Date;
  location_name: string;
  entry_fee: number;
  status: string;
  is_team_event: boolean;
  created_at: Date;
  registration_deadline: Date;
  max_participants: number;
  total_teams?: number;
  total_team_members?: number;
  total_solo_participants?: number;
};

export type eventDetailRes = {
  event: eventDetail;
};

export type soloParticipants = {
  full_name: string;
  email: string;
  contact_number: number;
  image_url: string;
  faculty: string;
};

export type teamParticipants = {
  leader: string;
  teamName: string;
  member: soloParticipants[];
};

export type teamMemberList = {
  participants: {
    participants: soloParticipants[];
    teamParticipants: teamParticipants[];
    teamEvent: boolean;
  };
};

export type newsBody = {
  title: string;
  msg: string;
};
