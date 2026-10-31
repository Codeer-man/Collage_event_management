import { create } from "zustand";
import type { decisionType, noti } from "./types";
import { deleteNoti, getAllNoti, invitionDecision, readNoti } from "./api";
import { toast } from "sonner";

type notiStoreType = {
  notification: noti | null;
  notificationList: noti[] | [];
  getNoti: () => Promise<void>;
  readNoti: (id: number) => Promise<void>;
  deleteNoti: (id?: number) => Promise<void>;
  invitionDecision: (decision: decisionType, id: number) => Promise<void>;
  unreadMsgSignal: () => number;
};

export const useNotiStore = create<notiStoreType>((set, get) => ({
  notification: null,
  notificationList: [],

  getNoti: async () => {
    const resp = await getAllNoti();

    set({
      notificationList: resp.notification,
    });
  },

  unreadMsgSignal: () => {
    // return get().notificationList.some((noti) => !noti.read_status);

    const unRead = get().notificationList.filter(
      (fil) => fil.read_status === false,
    );

    return unRead.length;
  },

  readNoti: async (id: number) => {
    const resp = await readNoti(id);

    set({ notification: resp.notification });
  },

  deleteNoti: async (id: number | undefined) => {
    const resp = deleteNoti(id);

    toast.promise(resp, {
      success: () => {
        get().getNoti();
        return "The notification has been deleted";
      },
      error: (err) => {
        if (err instanceof Error) {
          return err.message;
        }
        return "something went wrong";
      },
    });
  },

  invitionDecision: async (decision, id) => {
    const response = invitionDecision(decision, id);

    toast.promise(response, {
      success: (resp) => {
        return resp.message;
      },
      error: (err) => {
        const msg = err instanceof Error ? err.message : "something went wrong";

        return msg;
      },
    });
  },
}));
