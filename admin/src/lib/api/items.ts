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
  const statusMap: Record<string, string> = {
    UNCLAIMED: "UC",
    CLAIMED: "CL",
    EXPIRED: "EX",
  };

  const statusLabelToKey: Record<string, string> = {
    Unclaimed: "UNCLAIMED",
    Claimed: "CLAIMED",
    Expired: "EXPIRED",
  };

  const categoryMap: Record<string, string> = {
    BAGS: "BA",
    ELECTRONICS: "EL",
    EYEWEAR: "EW",
    FOOTWEAR: "FW",
    ID: "ID",
    KEYS: "KY",
    MISC: "MS",
    MOBILE: "MB",
    WALLETS: "WT",
    WATCHES: "WH",
  };

  const categoryLabelToKey: Record<string, string> = {
    "Bags & Backpacks": "BAGS",
    Electronics: "ELECTRONICS",
    Eyewear: "EYEWEAR",
    Footwear: "FOOTWEAR",
    "IDs & Cards": "ID",
    Keys: "KEYS",
    Miscellaneous: "MISC",
    "Mobile Devices": "MOBILE",
    "Wallets & Purses": "WALLETS",
    "Watches & Jewelries": "WATCHES",
  };

  const statusKey = statusLabelToKey[item.status];
  const categoryKey = categoryLabelToKey[item.category];

  const formData = new FormData();

  const data = {
    name: item.name,
    status: statusMap[statusKey],
    category: categoryMap[categoryKey],
    description: item.description,
    date_found: item.date_found.toISOString().split("T")[0],
    time_found: item.time_found,
    location_found: item.location_found,
  };

  if (item.image) {
    formData.append("image", item.image);
  }

  formData.append("data", JSON.stringify(data));

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
  const statusMap: Record<string, string> = {
    UNCLAIMED: "UC",
    CLAIMED: "CL",
    EXPIRED: "EX",
  };

  const statusLabelToKey: Record<string, string> = {
    Unclaimed: "UNCLAIMED",
    Claimed: "CLAIMED",
    Expired: "EXPIRED",
  };

  const categoryMap: Record<string, string> = {
    BAGS: "BA",
    ELECTRONICS: "EL",
    EYEWEAR: "EW",
    FOOTWEAR: "FW",
    ID: "ID",
    KEYS: "KY",
    MISC: "MS",
    MOBILE: "MB",
    WALLETS: "WT",
    WATCHES: "WH",
  };

  const categoryLabelToKey: Record<string, string> = {
    "Bags & Backpacks": "BAGS",
    Electronics: "ELECTRONICS",
    Eyewear: "EYEWEAR",
    Footwear: "FOOTWEAR",
    "IDs & Cards": "ID",
    Keys: "KEYS",
    Miscellaneous: "MISC",
    "Mobile Devices": "MOBILE",
    "Wallets & Purses": "WALLETS",
    "Watches & Jewelries": "WATCHES",
  };

  const statusKey = statusLabelToKey[item.status];
  const categoryKey = categoryLabelToKey[item.category];

  const formData = new FormData();

  const data = {
    name: item.name,
    status: statusMap[statusKey],
    category: categoryMap[categoryKey],
    description: item.description,
    date_found: item.date_found.toISOString().split("T")[0],
    time_found: item.time_found,
    location_found: item.location_found,
    photo_url: item.photo_url,
    ...(item.accepted_claim
      ? { accepted_claim: Number(item.accepted_claim) }
      : {}),
  };

  if (item.image instanceof File) {
    formData.append("image", item.image);
  }

  formData.append("data", JSON.stringify(data));

  return await fetch(`http://127.0.0.1:8000/lost-items/${item.id}/edit/`, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteItem(id: string): Promise<Response> {
  console.log("Deleting item with ID:", id, typeof id);
  alert("About to delete " + id);
  return await fetch(`http://127.0.0.1:8000/lost-items/${id}/delete/`, {
    method: "DELETE",
  });
}
