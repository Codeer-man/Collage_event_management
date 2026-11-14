import { create } from "zustand";
import type { eventDetail, soloParticipants, teamParticipants } from "./type";
import { getEventDetail, getParticipantsByOrganizer } from "./api";

type eventStoreProps = {
  loading: boolean;
  event: eventDetail | null;
  teamEvent: boolean | null;
  soloParticipants: soloParticipants[] | null;
  teamParticipants: teamParticipants[] | null;
  getEventParticipants: (eventId: number) => Promise<void>;
  getEventDetail: (eventId: number) => Promise<void>;
};

export const useEventStore = create<eventStoreProps>((set, get) => ({
  event: null,
  loading: false,
  soloParticipants: null,
  teamParticipants: null,
  teamEvent: null,
  getEventDetail: async (id: number) => {
    try {
      set({ loading: true });
      const res = await getEventDetail(id);

      set({ event: res.event });
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "something went wrong";

      console.error(msg);
    } finally {
      set({ loading: false });
    }
  },
  getEventParticipants: async (id: number) => {
    try {
      set({
        loading: true,
        soloParticipants: null,
        teamParticipants: null,
        teamEvent: null,
      });

      const res = await getParticipantsByOrganizer(id);

      const event = res.participants;

      if (event.teamEvent === true) {
        set({
          teamEvent: true,
          teamParticipants: event.teamParticipants,
        });
      } else {
        set({
          teamEvent: false,
          soloParticipants: event.participants,
        });
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";

      console.error(msg);
    } finally {
      set({ loading: false });
    }
  },
}));
