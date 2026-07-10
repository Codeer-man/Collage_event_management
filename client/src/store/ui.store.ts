import { create } from "zustand";

export type Theme = "light" | "dark";

type UIStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  theme: "dark",

  setTheme: (theme) =>
    set({
      theme,
    }),
}));
