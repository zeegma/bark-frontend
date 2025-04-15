import { writable, get } from "svelte/store";

export const itemsStore = createItemsStore();
export const items = writable<Item[]>([]); // The writable store for all items
export const currentItem = writable<Item | null>(null); // Holds the current item (for adding/editing)
export const showAddModal = writable(false); // Controls the visibility of the add modal

export type Item = {
  id: string;
  name: string;
  status: string;
  category: string;
  claimant?: string;
  description: string;
  dateLost: Date;
  timeLost: string;
  lastKnownLocation: string;
  image?: File | null;
  imagePreview?: string | null;
};

function createItemsStore() {
  const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
  const { subscribe, set, update } = writable<Item[]>(storedItems);

  const saveToLocalStorage = (items: Item[]) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  return {
    subscribe,
    addItem: (item: Item) =>
      update((items) => {
        const updated = [...items, item];
        saveToLocalStorage(updated);
        return updated;
      }),
    setItems: (newItems: Item[]) => {
      saveToLocalStorage(newItems);
      set(newItems);
    },
    reset: () => {
      saveToLocalStorage([]);
      set([]);
    },
    getNextId: () => getNextHexId(get(items)), // Get next ID from the items store
    updateItem: (updatedItem: Item) => {
      update((items) => {
        const index = items.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          // Replace the old item with the updated one
          items[index] = updatedItem;
        }
        saveToLocalStorage(items);
        return items;
      });
    },
    deleteItem: (id: string) => {
      update((items) => {
        const filteredItems = items.filter((item) => item.id !== id);
        saveToLocalStorage(filteredItems);
        return filteredItems;
      });
    },
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
  claimant: "",
  image: null,
  imagePreview: null,
  description: "",
  dateLost: new Date(), // New Date as default for dateLost
  timeLost: "",
  lastKnownLocation: "",
});
