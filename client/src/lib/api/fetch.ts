export async function fetchItemDetails(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/lost-items/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch item details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching item details:", error);
    return null;
  }
}

export async function fetchAllItems(): Promise<any[]> {
  try {
    const response = await fetch('/api/lost-items/');
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
}