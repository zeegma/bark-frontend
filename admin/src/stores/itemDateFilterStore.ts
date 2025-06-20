import { writable } from "svelte/store";

export type DateFilterOptions = {
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
};

const initialDateFilter: DateFilterOptions = {
  startDate: null,
  endDate: null,
  isActive: false,
};

function createDateFilterStore() {
  const { subscribe, set, update } =
    writable<DateFilterOptions>(initialDateFilter);

  return {
    subscribe,
    setDateRange: (startDate: Date | null, endDate: Date | null) =>
      update((state) => {
        console.log("Setting date range:", { startDate, endDate });
        return {
          ...state,
          startDate,
          endDate,
          isActive: !!(startDate || endDate),
        };
      }),
    clearDateFilter: () => set(initialDateFilter),
  };
}

export const itemDateFilterStore = createDateFilterStore();

export const itemDateFilterActions = {
  setDateRange: itemDateFilterStore.setDateRange,
  clearDateFilter: itemDateFilterStore.clearDateFilter,
};
