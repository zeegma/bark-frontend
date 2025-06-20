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
    const response = await fetch("http://127.0.0.1:8000/admins/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Login Status:", response.status);
    console.log("Login Status Text:", response.statusText);

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

export async function getAdminDetail(adminId: number, token: string) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/admins/${adminId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to fetch admin details.");
    }

    const adminDetails = await response.json();
    console.log("Admin details: ", adminDetails);

    return adminDetails; // Make sure to return the details
  } catch (error) {
    console.error("Error fetching admin details:", error);
    throw error; // Re-throw the error for better error handling
  }
}

export async function deleteAdminAccount(adminId: number): Promise<boolean> {
  const token = get(accessToken);
  if (!token) {
    console.error("No access token available.");
    return false;
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/admins/${adminId}/delete/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error("Delete response status:", response.status);
      return false;
    }

    console.log("Admin account deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting admin account:", error);
    return false;
  }
}
