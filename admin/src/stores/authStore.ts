import { writable } from "svelte/store";
import { tick } from "svelte";

export const authInitialized = writable(false);

export const accessToken = writable<string | null>(
  sessionStorage.getItem("accessToken"),
);
export const refreshToken = writable<string | null>(
  sessionStorage.getItem("refreshToken"),
);
export const admin = writable<any>(
  JSON.parse(sessionStorage.getItem("admin") || "null"),
);

export const initializeAuth = async () => {
  const token = sessionStorage.getItem("accessToken");
  accessToken.set(token);
  await tick();
  authInitialized.set(true);
};

accessToken.subscribe((value) => {
  if (value) {
    sessionStorage.setItem("accessToken", value);
  } else {
    sessionStorage.removeItem("accessToken");
    console.warn("Access token has expired or been cleared.");
  }
});

refreshToken.subscribe((value) => {
  if (value) {
    sessionStorage.setItem("refreshToken", value);
  } else {
    sessionStorage.removeItem("refreshToken");
  }
});

admin.subscribe((value) => {
  if (value) {
    sessionStorage.setItem("admin", JSON.stringify(value));
  } else {
    sessionStorage.removeItem("admin");
  }
});

export const logout = () => {
  accessToken.set(null);
  refreshToken.set(null);
  admin.set(null);
};
