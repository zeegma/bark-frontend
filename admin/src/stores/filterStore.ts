import { writable } from "svelte/store";

export const statusOptions = [
  "All",
  "Unclaimed",
  "Claimed",
  "Expired",
] as const;

export const categoryOptions = [
  "All",
  "Bags & Backpacks",
  "Electronics",
  "Eyewear",
  "Footwear",
  "IDs & Cards",
  "Keys",
  "Miscellaneous",
  "Mobile Devices",
  "Wallets & Purses",
  "Watches & Jewelries",
] as const;

export interface FilterOptions {
  status: StatusFilter;
  category: CategoryFilter;
}

export const filterStore = writable<FilterOptions>({
  status: "All",
  category: "All",
});

export type CategoryFilter = (typeof categoryOptions)[number];
export type StatusFilter = (typeof statusOptions)[number];

export const categoryMap: Record<string, string> = {
  "BAGS_&_BACKPACKS": "BA",
  ELECTRONICS: "EL",
  EYEWEAR: "EW",
  FOOTWEAR: "FW",
  "IDS_&_CARDS": "ID",
  KEYS: "KY",
  MISCELLANEOUS: "MS",
  MOBILE_DEVICES: "MB",
  "WALLETS_&_PURSES": "WT",
  "WATCHES_&_JEWELRIES": "WH",
};

export const statusMap: Record<string, string> = {
  UNCLAIMED: "UC",
  CLAIMED: "CL",
  EXPIRED: "EX",
};

export const reverseCategoryMap = Object.fromEntries(
  Object.entries(categoryMap).map(([key, val]) => [val, key]),
);

export const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([key, val]) => [val, key]),
);
