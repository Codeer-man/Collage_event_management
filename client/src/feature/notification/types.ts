type notiType =
  | "team_invitation"
  | "team_invitation_response"
  | "event_update"
  | "event_news";

export type noti = {
  id: string;
  title: string;
  message: string;
  created_at: Date;
  type: notiType;
  entity_id: string;
  entity_type: string;
  read_status: boolean;
};

export type singleNotiResp = {
  notification: noti;
};

export type notiRes = {
  notification: noti[];
};

export type decisionType = "accept" | "reject";
