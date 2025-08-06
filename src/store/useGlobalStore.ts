import { create } from "zustand";

type GlobalState = {
  selectedHours: number[];
  setSelectedHours: (hours: number[]) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedHours: [0, 24],
  setSelectedHours: (hours) => set({ selectedHours: hours }),
}));
