import { writable } from "svelte/store";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export const selectedCategory = writable("");
export const selectedStatus = writable("");
export const searchQuery = writable("");
export const selectedDateRange = writable<DateRange>({ startDate: null, endDate: null });