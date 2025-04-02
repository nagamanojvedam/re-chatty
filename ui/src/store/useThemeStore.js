import { create } from "zustand";

export const useThemeStore = create((set) => ({
  // theme: localStorage.getItem("chat-theme") || "winter",
  theme: "winter",

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
