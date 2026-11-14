import { apiGet } from "../../lib/api";
import type { eventDetailRes, teamMemberList } from "./type";

// get event
export async function getEventDetail(eventId: number) {
  return await apiGet<eventDetailRes>(`/event/${eventId}`);
}
//  get event participants
export async function getParticipantsByOrganizer(eventId: number) {
  return apiGet<teamMemberList>(`/event/${eventId}/participants`);
}
