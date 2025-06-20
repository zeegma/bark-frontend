import { writable } from "svelte/store";

export type ViewType = "list" | "grid";

const storedView = sessionStorage.getItem("currentView") as ViewType | null;
export const viewStore = writable<ViewType>(storedView || "list");
