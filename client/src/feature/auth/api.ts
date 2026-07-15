import { apiGet, apiPost } from "../../lib/api";
import type {
  allFaculty,
  checkAuthResp,
  createUser,
  createuserRes,
  loginUser,
  loginUserRes,
  registerUserFormBody,
} from "./type";

//handle key and value of register
function buildRegisterFormData(body: registerUserFormBody) {
  const formData = new FormData();

  formData.append("full_name", body.full_name);
  formData.append("email", body.email);
  formData.append("password", body.password);
  formData.append("contact_number", body.contact_number);
  formData.append("faculty_id", body.faculty_id);

  if (body.file) {
    formData.append("image", body.file);
  }

  return formData;
}

export function createUser(body: createUser) {
  const formData = buildRegisterFormData(body);
  return apiPost<createuserRes>("/auth/register", formData);
}

export function loginUser(body: loginUser) {
  return apiPost<loginUserRes>("/auth/login", body);
}

export function logoutUser() {
  return apiGet("/auth/logout");
}

export function checkAuth() {
  return apiGet<checkAuthResp>("/auth/check-auth");
}

export function fetchFacluty() {
  return apiGet<allFaculty>("/auth/faculty");
}
