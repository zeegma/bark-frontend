import type { LostItem } from "../types";

export interface DashboardStats {
  total: number;
  lost: number;
  claimed: number;
  expired: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await fetch("http://127.0.0.1:8000/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching dashboard stats: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
}

export async function createItemQuickEntry(data: LostItem): Promise<any> {
  try {
    const formData = new FormData();

    const jsonData = {
      name: data.name,
      description: data.description,
      category: data.category,
      date_found: data.date_found,
      time_found: data.time_found,
      location_found: data.location_found,
      status: data.status,
    };

    formData.append("data", JSON.stringify(jsonData));

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await fetch("http://127.0.0.1:8000/lost-items/create/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error creating lost item: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create lost item:", error);
    throw error;
  }
}
