import { apiGet, apiPatch, apiPost } from "../../lib/api";
import type {
  CreateEventPayload,
  joinEventRes,
  myEventTypeResp,
  TeamResp,
} from "./type";

export async function getAllEvents() {
  return apiGet<joinEventRes>("/user/events");
}

export async function joinSingleEvent(eventId: number) {
  return apiPost("/user/event/single", { eventId });
}

export async function joinTeamEvent(input: {
  teamId: string;
  eventId: number;
}) {
  return apiPost("/user/event/team", input);
}

export async function CreateEvent(data: CreateEventPayload) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("location", data.location);
  formData.append("event_date", data.event_date);
  formData.append("registration_deadline", data.registration_deadline);

  formData.append("entry_fee", String(data.entry_fee));
  formData.append("contact", String(data.contact));
  formData.append("max_participants", String(data.max_participants));
  formData.append("isTeamEvent", String(data.isTeamEvent));
  formData.append("faculty", JSON.stringify(data.faculty));

  if (data.file) {
    formData.append("image", data.file);
  }

  return await apiPost("/user/create/event", formData);
}

export async function getYourEvents() {
  return apiGet<myEventTypeResp>("/user/my/event");
}

export async function cancelEvent(eventId: string) {
  return apiPatch("/user/event/cancel", { eventId });
}

export async function createTeam(eventId: number, teamName: string) {
  return apiPost("/user/create", { eventId, teamName });
}

export async function getYourTeam() {
  return apiGet<TeamResp>("/user/your/team");
}

type manageMemberType = {
  eventId: string;
  teamId: string;
  email?: string;
  userId?: string;
};

export async function manageMember({
  eventId,
  teamId,
  email,
  userId,
}: manageMemberType) {
  return apiPost("/user/add/member", { email, eventId, teamId, userId });
}

export async function getTeamYouAreIn() {
  return apiGet("/user/team");
}

export async function getSingleJoinedEvents() {
  return apiGet<joinEventRes>("/user/event/registered/solo");
}

export async function getTeamJoinedEvents() {
  return apiGet<joinEventRes>("/user/event/registered/team");
}
