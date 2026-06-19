"use client";

import { create } from "zustand";

type StudyStore = {
  activeModule: string;
  focusMinutes: number;
  setActiveModule: (module: string) => void;
  setFocusMinutes: (minutes: number) => void;
};

export const useStudyStore = create<StudyStore>((set) => ({
  activeModule: "dashboard",
  focusMinutes: 25,
  setActiveModule: (activeModule) => set({ activeModule }),
  setFocusMinutes: (focusMinutes) => set({ focusMinutes })
}));
