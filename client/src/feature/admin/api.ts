import { apiGet, apiPatch } from "../../lib/api";
import type {
  event,
  eventRes,
  StudentResp,
  unApprovedRes,
  unApprovedSts,
} from "./types";

export async function getAllsts(
  page: number = 1,
  limit: number = 20,
  search: string = "",
) {
  return apiGet<StudentResp>("/admin/students", {
    params: {
      page,
      limit,
      search,
    },
  });
}

export async function getAllUnApprovedSts() {
  return apiGet<unApprovedRes>("/admin/notApproved");
}

export async function approveStudent(userId: string, value: boolean) {
  return apiPatch("/admin/approve", { userId, value });
}

export async function getEvents() {
  return apiGet<event[]>("/admin/event");
}
export async function getPendingEvents() {
  return apiGet<eventRes>("/admin/event/pending");
}
export async function approveEvent(status: boolean, eventId: string) {
  return apiPatch<event[]>("/admin/event", {
    status,
    eventId,
  });
}
