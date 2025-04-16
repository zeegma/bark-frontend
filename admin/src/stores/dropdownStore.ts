import { writable } from "svelte/store";

export const openDropdownIdStore = writable<string | null>(null);

export const dropdownActions = {
  openDropdown: (id: string) => {
    openDropdownIdStore.set(id);
  },

  closeAll: () => {
    openDropdownIdStore.set(null);
  },

  toggleDropdown: (id: string) => {
    openDropdownIdStore.update((currentId) => {
      return currentId === id ? null : id;
    });
  },
};
