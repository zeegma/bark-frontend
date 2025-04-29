import type { ClaimantResponse } from "../types";

// Fetch claimants
export async function fetchClaimants(): Promise<ClaimantResponse[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/claim-forms/`);

    if (!response.ok) {
      throw new Error(`Error fetching claimants: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch claimants:", error);
    throw error;
  }
}

// Single/bulk deletion of claimants
export async function deleteClaimants(ids: number[]): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/claimants/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error(`Error deleting claimants: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error("Failed to delete claimants:", error);
    throw error;
  }
}
