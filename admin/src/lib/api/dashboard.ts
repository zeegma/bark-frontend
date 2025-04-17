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
