import { create } from "zustand";
import type { AppUser } from "../lib/type";

type AuthStatus = "idle" | "loading" | "ready" | "error";

type AuthStore = {
  status: AuthStatus;
  user: AppUser | null;
  booting: boolean;
  error: string | null;

  setLoading: () => void;
  setUser: (user: AppUser | null) => void;
  setError: (message: string) => void;
  cleanAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  status: "idle",
  booting: false,
  user: null,
  error: null,

  setLoading: () =>
    set({
      status: "loading",
      error: null,
    }),

  setUser: (user) =>
    set({
      status: "ready",
      user,
      booting: true,
      error: null,
    }),

  cleanAuth: () =>
    set({
      status: "idle",
      error: null,
      booting: true,
      user: null,
    }),

  setError: (message) =>
    set({
      status: "error",
      booting: true,
      error: message,
    }),
}));
