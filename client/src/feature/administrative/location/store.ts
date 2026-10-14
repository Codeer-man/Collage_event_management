import { create } from "zustand";
import type { location } from "./types";
import { getLocation } from "./api";

type locationProps = {
  location: location[] | null;
  loadLocation: () => Promise<void>;
};

export const uselocationStore = create<locationProps>((set) => ({
  location: null,
  loadLocation: async () => {
    const response = await getLocation();

    set({
      location: response.location,
    });
  },
}));
