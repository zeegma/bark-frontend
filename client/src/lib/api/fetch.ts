import { mockdata } from "../constants/mockdata";

export async function fetchItemDetails(id: string): Promise<any> {
  const item = mockdata.find((item) => item.id.toString() === id);
  return item || null;
}