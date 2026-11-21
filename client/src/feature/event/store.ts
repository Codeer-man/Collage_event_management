import { create } from "zustand";
import type {
  eventDetail,
  newsBody,
  soloParticipants,
  teamParticipants,
} from "./type";
import {
  getEventDetail,
  getParticipantsByOrganizer,
  sendEventNews,
} from "./api";
import { toast } from "sonner";

type eventStoreProps = {
  loading: boolean;
  event: eventDetail | null;
  teamEvent: boolean | null;
  soloParticipants: soloParticipants[] | null;
  teamParticipants: teamParticipants[] | null;
  getEventParticipants: (eventId: number) => Promise<void>;
  getEventDetail: (eventId: number) => Promise<void>;
  sendNews: (eventId: number, body: newsBody) => Promise<void>;
};

export const useEventStore = create<eventStoreProps>((set) => ({
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
  sendNews: async (id: number, body: newsBody) => {
    try {
      const resp = await sendEventNews(id, body);
      console.log(resp);

      toast.success("notification has been successfully sent");
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";

      console.error(msg);
    }
  },
}));
