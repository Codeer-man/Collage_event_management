import { apiGet, apiPatch, apiPost } from "../../lib/api";
import type { CreateEventPayload, joinEventRes, myEventTypeResp } from "./type";

export async function getAllEvents() {
  return apiGet<joinEventRes>("/user/events");
}

export async function joinSingleEvent(eventId: string) {
  return apiPost("/students/events/single", eventId);
}

export async function joinTeamEvent(input: {
  teamId: number;
  eventId: number;
}) {
  return apiPost("/students/events/single", input);
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
