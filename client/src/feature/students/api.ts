import type { ParticipantResponse } from "../../components/student/myEvent/eventDetail";
import { apiGet, apiPatch, apiPost } from "../../lib/api";
import type {
  CreateEventFormData,
  joinEventRes,
  locationRes,
  myEventTypeResp,
  participateUserRes,
  TeamResp,
} from "./type";

export async function getAllEvents() {
  return apiGet<joinEventRes>("/user/events");
}

export async function joinSingleEvent(eventId: number) {
  return apiPost("/user/event/single", { eventId });
}

export async function CreateEvent(data: CreateEventFormData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("location_type", data.location_type);
  if (data.location_type === "external") {
    formData.append("location_name", data.location_name!);
  } else {
    formData.append("location_id", data.location_id!);
  }

  formData.append("event_date", data.event_date);
  formData.append("registration_deadline", data.registration_deadline);
  formData.append("end_at", data.end_at);

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
  member_id: string;
};

export async function manageMember({
  eventId,
  teamId,
  member_id,
}: manageMemberType) {
  return apiPost("/user/add/member", { eventId, teamId, member_id });
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

export async function getParticipants(eventId: string) {
  return apiGet<ParticipantResponse>(`/user/event/participate/${eventId}`);
}

export async function loadLocationSts() {
  return apiGet<locationRes>("/user/location");
}

// get participants
export async function getUsers(fullName: string) {
  return apiGet<participateUserRes>(`/user/sts/${fullName}`, {});
}
