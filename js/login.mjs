import { API_LOGIN_URL } from "./constants.mjs";
import { NoroffAPIKey } from "./constants.mjs";
import { showMessage } from "./errorDisplay.mjs";
import { showLoading, hideLoading } from "./loadingSpinner.mjs";

// Login in and retrieve token for user.

export async function loginUser(email, password) {
  showLoading();
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
      const name = data.data?.name;

      if (accessToken) {
        //Store token in localStorage for authentication in other pages
        localStorage.setItem("authToken", accessToken);
        //Store username/author name in localStorage for use on other pages.
        localStorage.setItem("name", name);
      }
      return accessToken;
    } else {
      showMessage(
        "Login failed. Please check your email and password and try again.",
        "error"
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
  hideLoading();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // Check if token exists in localStorage and redirect to manage.html if it does.
  const token = localStorage.getItem("authToken");

  if (token && window.location.pathname.endsWith("/login.html")) {
    // Redirect user to manage page if logged in.
    window.location.href = "./manage.html";
    return;
  }

  // Add event listener for login form.
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from submitting normally.

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const accessToken = await loginUser(email, password);
    if (accessToken) {
      window.location.href = "./manage.html";
    } else {
      showMessage("Wrong username or password, please try again.", "error");
    }
  });
});
