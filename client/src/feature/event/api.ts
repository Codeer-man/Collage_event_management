import { apiGet, apiPost } from "../../lib/api";
import type { eventDetailRes, newsBody, teamMemberList } from "./type";

// get event
export async function getEventDetail(eventId: number) {
  return await apiGet<eventDetailRes>(`/event/${eventId}`);
}
//  get event participants
export async function getParticipantsByOrganizer(eventId: number) {
  return apiGet<teamMemberList>(`/event/${eventId}/participants`);
}

//  send news to the participants
export async function sendEventNews(eventId: number, body: newsBody) {
  return await apiPost(`event/noti/${eventId}`, body);
}
