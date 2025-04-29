import { writable } from "svelte/store";

export type ViewType = "list" | "grid";

export const viewStore = writable<ViewType>("list");
