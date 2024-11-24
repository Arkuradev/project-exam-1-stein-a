// Registration of a user to the API
import { API_REGISTER_URL } from "./constants.mjs";

export async function register(name, email, password) {
  try {
    const response = await fetch(API_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Retreiving form data

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await register(name, email, password);
  });
