// Registration of a user to the API
import { API_REGISTER_URL } from "./constants.mjs";
import { showMessage } from "./errorDisplay.mjs";

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
    if (response.ok) {
      showMessage("Registration successful! You can now log in.", "success");
    } else {
      showMessage(
        "Registration failed! Please make sure to use a valid @stud.noroff.no email and have a password with at least 8 characters.",
        "error"
      );
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
