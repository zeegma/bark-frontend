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

export interface LostItem {
  name: string;
  description: string;
  category: string;
  date_found: string;
  time_found: string;
  location_found: string;
  status: string;
  image?: File | null;
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
  accepted_claim?: number | null;
  accepted_claim_id: number | null;
  description: string;
  date_found: Date;
  time_found: string;
  location_found: string;
  photo_url?: string;
  image?: File;
  imagePreview?: string | null;
}
