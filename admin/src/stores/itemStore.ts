import { writable, get } from "svelte/store";
import type { Item } from "../lib/types";
import {
  fetchItems,
  addItem as addItemToDB,
  updateItem as updateItemInDB,
  deleteItem as deleteItemInDB,
} from "../lib/api/items";

export const itemsStore = createItemsStore();
export const items = writable<Item[]>([]);
export const currentItem = writable<Item | null>(null);
export const showAddModal = writable(false);

function createItemsStore() {
  const { subscribe, set, update } = writable<Item[]>([]);

  return {
    subscribe,
    loadItems: async () => {
      const fetched = await fetchItems();
      set(fetched);
    },
    addItem: async (item: Item) => {
      const response = await addItemToDB(item);
      if (response.ok) {
        update((items) => [...items, item]);
      } else {
        console.error("Failed to add");
      }
    },
    updateItem: async (updatedItem: Item) => {
      const response = await updateItemInDB(updatedItem);
      if (response.ok) {
        update((items) =>
          items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item,
          ),
        );
      } else {
        console.error("Failed to edit/update");
      }
    },
    deleteItem: async (id: string) => {
      const response = await deleteItemInDB(id);
      if (response.ok) {
        update((items) => items.filter((item) => item.id !== id));
        return true;
      } else {
        console.error("Failed to delete");
        return false;
      }
    },
    getNextId: () => getNextHexId(get(items)),
    setItems: (newItems: Item[]) => set(newItems),
    reset: () => set([]),
  };
}

// Function to generate the next ID based on existing items
export function getNextHexId(items: Item[]): string {
  if (items.length === 0) return "LOST0001";
  const lastItem = items[items.length - 1];
  const lastId = parseInt(lastItem.id.replace("LOST", ""), 16);
  const nextId = (lastId + 1).toString(16).toUpperCase().padStart(4, "0");
  return `LOST${nextId}`;
}

// Function to create a new item, with default values and a generated ID
export const createNewItem = (nextId: string): Item => ({
  id: nextId,
  name: "",
  status: "",
  category: "",
  accepted_claim: null,
  accepted_claim_id: null,
  photo_url: "",
  imagePreview: null,
  description: "",
  date_found: new Date(), // New Date as default for dateLost
  time_found: "",
  location_found: "",
});
