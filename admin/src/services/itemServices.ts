import type { Item } from "../stores/itemStore";

export async function addItemToAPI(item: Item) {
  try {
    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to add item to API:", error);
    throw error;
  }
}

// Add function something for deleting, editing, and viewing/displaying ?
