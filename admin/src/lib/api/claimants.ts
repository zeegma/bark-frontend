import type { ClaimantResponse } from "../types";

export async function fetchClaimants(): Promise<ClaimantResponse[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/claim-forms`);

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

// Placeholder code to prepare for real endpoint
export async function fetchClaimantById(id: number): Promise<ClaimantResponse> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/claim-forms/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching claimant: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch claimant with ID ${id}:`, error);
    throw error;
  }
}

// Placeholder code to prepare for real endpoint
export async function deleteClaimant(id: number): Promise<void> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/claim-forms/claimants/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Error deleting claimant: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete claimant with ID ${id}:`, error);
    throw error;
  }
}
