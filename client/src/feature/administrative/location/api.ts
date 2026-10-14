import { apiGet, apiPost, apiPut } from "../../../lib/api";
import type { locationForm, locationRes } from "./types";

export async function addLocation(input: locationForm) {
  return await apiPost("/super/location", input);
}

export async function updateLocation(input: locationForm, id: string) {
  return await apiPut(`/super/location/${id}`, input);
}

export async function getLocation() {
  return await apiGet<locationRes>("/super/location");
}
