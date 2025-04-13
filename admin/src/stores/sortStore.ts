import { writable } from "svelte/store";

export type SortField =
  | "name"
  | "itemRequested"
  | "facebook"
  | "dateFiled"
  | "id";

export type SortOrder = "Ascending" | "Descending";

export interface SortOptions {
  sortBy: SortField;
  sortOrder: SortOrder;
}

export const sortStore = writable<SortOptions>({
  sortBy: "name",
  sortOrder: "Ascending",
});
