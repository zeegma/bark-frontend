import { get } from "svelte/store";
import { accessToken } from "../../stores/authStore";

export interface Admin {
  name: string;
  email: string;
  number: string;
  password: string;
}

export async function registerAdmin(data: Admin) {
  const response = await fetch("http://127.0.0.1:8000/admins/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = "Registration failed.";

    try {
      const result = await response.json();
      errorMessage = result.message || errorMessage;
    } catch (error) {
      console.error("Failed to parse error response JSON:", error);
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function loginAdmin(email: string, password: string) {
  try {
    // console.log("Attempting login with:", { email, password });
    const response = await fetch("http://127.0.0.1:8000/admins/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);

    let result;
    try {
      result = await response.json();
    } catch (err) {
      throw new Error("Failed.");
    }

    if (!response.ok) {
      throw new Error(result.message || "Login failed.");
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logoutAdmin(refreshToken: string) {
  try {
    const token = get(accessToken);
    console.log("Sending logout request with refreshToken:", refreshToken);
    const response = await fetch("http://127.0.0.1:8000/admins/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.log("Logout response status:", response.status);
      throw new Error("Logout failed.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
