import { apiGet, apiPatch, apiPost } from "../../../lib/api";
import type { faculty } from "../../auth/type";
import type {
  AssignAdminResponse,
  createFacultyForm,
  getAllFacultyRes,
  getUser,
  updateFacultyBody,
} from "./types";

//create faculty
export function createFaculty(body: createFacultyForm) {
  return apiPost<faculty>("/super/faculty/create", body);
}

// get all faculty
export function getAllFaculty() {
  return apiGet<getAllFacultyRes>("/super/faculty");
}

// update faculty
export function updateFacultyName(body: updateFacultyBody) {
  return apiPatch("/super/faculty/edit", body);
}

// find user for admin role
export function findUserForAdmin(body: getUser) {
  return apiGet<AssignAdminResponse>(`/super/user/${body.facultyId}`, {
    params: {
      search: body.search,
    },
  });
}
// asign admin
export function assignAdmin(body: { facultyId: string; userId: string }) {
  return apiPatch(`/super/asign/faculty`, body);
}
