import { showLoading, hideLoading } from "./loadingSpinner.mjs";

// Fetch request with lazy loading and error handling.

export async function fetchWithLoading(url, options = {}) {
  try {
    showLoading(); // Show Loading spinner
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`; // Create error message
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    showMessage(error.message, "error");
  } finally {
    hideLoading(); // Hide Loading spinner
  }
}
