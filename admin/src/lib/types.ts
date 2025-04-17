// API response types
export interface ClaimantResponse {
  id: number;
  request_date: string;
  name: string;
  ownership_photo: string | null;
  detailed_description: string;
  number: string;
  media: string;
  item_id: number;
  item_name: string;
  item_image_url: string;
}

// Internal application types (formatted for display)
export interface ClaimItem {
  id: string;
  name: string;
  phone: string;
  facebook: string;
  dateFiled: string;
  itemId: string;
  itemRequested: string;
  detailedDescription: string;
  ownershipProofPhoto: string | null;
  itemPhoto: string;
  hasImage?: boolean;
}

// Items
export interface Item {
  id: string;
  name: string;
  status: string;
  category: string;
  claimant?: string;
  description: string;
  date_found: Date;
  time_found: string;
  location_found: string;
  image?: File | null | string;
  imagePreview?: string | null;
}
