import type { Item } from "../types";

export async function fetchItems(): Promise<Item[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/lost-items/");
    if (!res.ok) {
      throw new Error("Failed to fetch items");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addItem(item: Item): Promise<Response> {
  const formData = new FormData();

  formData.append("name", item.name);
  formData.append("status", item.status);
  formData.append("category", item.category);
  formData.append("description", item.description);
  formData.append("date_found", item.date_found.toISOString().split("T")[0]);
  formData.append("time_found", item.time_found);
  formData.append("location_found", item.location_found);

  if (item.claimant) {
    formData.append("claimant", item.claimant);
  }

  if (item.photo_url) {
    formData.append("photo_url", item.photo_url);
  }

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await fetch("http://127.0.0.1:8000/lost-items/create/", {
    method: "POST",
    body: formData,
  });

  return response;
}

export async function updateItem(item: Item): Promise<Response> {
  const formData = new FormData();

  formData.append("name", item.name);
  formData.append("status", item.status);
  formData.append("category", item.category);
  formData.append("description", item.description);
  formData.append("dateLost", item.date_found.toISOString().split("T")[0]);
  formData.append("timeLost", item.time_found);
  formData.append("lastKnownLocation", item.location_found);

  if (item.claimant) {
    formData.append("claimant", item.claimant);
  }

  if (item.photo_url) {
    formData.append("photo_url", item.photo_url);
  }

  return await fetch("http://127.0.0.1:8000/lost-items/${item.id}/edit/", {
    method: "PUT",
    body: formData,
  });
}

export async function deleteItem(id: String): Promise<Response> {
  return await fetch("http://127.0.0.1:8000/lost-items/${item.id}/delete/", {
    method: "DELETE",
  });
}
