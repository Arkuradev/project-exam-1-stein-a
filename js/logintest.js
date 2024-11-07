import { NoroffAPIKey } from "./constants.mjs";

async function loginUser(email, password) {
  const loginUrl = "https://v2.api.noroff.dev/auth/login";

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "X-Noroff-API-Key": NoroffAPIKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Adjusted to use "email" instead of "username"
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Token received:", data.data?.accessToken);
      return data.accessToken;
    } else {
      console.log("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// Example usage:
loginUser("gamerblog@stud.noroff.no", "Annabelle1099");
