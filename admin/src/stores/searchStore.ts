import { writable } from "svelte/store";

export const searchStore = writable("");

export const searchActions = {
  setSearchTerm: (term: string) => {
    searchStore.set(term);
  },
  clearSearch: () => {
    searchStore.set("");
  },
};
