import { apiDelete, apiGet, apiPatch } from "../../lib/api";
import type { decisionType, notiRes, singleNotiResp } from "./types";
type messageResponse = {
  message: string;
};

export async function getAllNoti() {
  return await apiGet<notiRes>("/noti");
}

export async function readNoti(notiId: number) {
  return await apiGet<singleNotiResp>(`/noti/read/${notiId}`);
}

export async function deleteNoti(notiId?: number | null) {
  if (notiId === null) {
    return await apiDelete("/noti/delete");
  }

  return await apiDelete(`/noti/delete/${notiId}`);
}

// invition decision
export async function invitionDecision(
  decision: decisionType,
  entityId: number,
) {
  return await apiPatch<messageResponse>(`/user/team/${decision}`, {
    entityId,
  });
}
