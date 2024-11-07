import { API_LOGIN_URL } from "./constants.mjs";
import { NoroffAPIKey } from "./constants.mjs";

// Login in and retrieve token for user.

export async function loginUser(email, password) {
  try {
    const response = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: {
        "X-Noroff-API-Key": NoroffAPIKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.data?.accessToken;

      // console.log("Token received:", accessToken);
      return accessToken;
    } else {
      console.log("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
