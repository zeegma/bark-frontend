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
  const response = await fetch("http://127.0.0.1:8000/admins/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

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
}
