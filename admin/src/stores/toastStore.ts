import { writable } from "svelte/store";

// Toast visibility and message store
export const toastVisible = writable(false);
export const toastMessage = writable("");
export const toastType = writable<"success" | "error">("success");
export const toastCounter = writable(5);

let toastInterval: ReturnType<typeof setInterval>;

export function showToast(
  message: string,
  type: "success" | "error" = "success",
) {
  toastMessage.set(message);
  toastType.set(type);
  toastVisible.set(true);
  toastCounter.set(5);

  // Clear existing interval
  if (toastInterval) clearInterval(toastInterval);

  // Start countdown for auto hide
  toastInterval = setInterval(() => {
    toastCounter.update((counter) => {
      if (counter <= 1) {
        clearInterval(toastInterval);
        toastVisible.set(false);
        return 0;
      }
      return counter - 1;
    });
  }, 1000);
}
