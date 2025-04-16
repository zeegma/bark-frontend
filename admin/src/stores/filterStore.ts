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
