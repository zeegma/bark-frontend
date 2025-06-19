import { writable } from "svelte/store";

export const accessToken = writable<string | null>(
  localStorage.getItem("accessToken"),
);
export const refreshToken = writable<string | null>(
  localStorage.getItem("refreshToken"),
);
export const admin = writable<any>(
  JSON.parse(localStorage.getItem("admin") || "null"),
);

accessToken.subscribe((value) => {
  if (value) {
    localStorage.setItem("accessToken", value);
  } else {
    localStorage.removeItem("accessToken");
    console.warn("Access token has expired or been cleared.");
  }
});

refreshToken.subscribe((value) => {
  if (value) {
    localStorage.setItem("refreshToken", value);
  } else {
    localStorage.removeItem("refreshToken");
  }
});

admin.subscribe((value) => {
  if (value) {
    localStorage.setItem("admin", JSON.stringify(value));
  } else {
    localStorage.removeItem("admin");
  }
});

export const logout = () => {
  accessToken.set(null);
  refreshToken.set(null);
  admin.set(null);
};
