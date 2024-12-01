//Function to allow user to share blog post by clicking the share icon
import { showMessage } from "./errorDisplay.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const shareIcon = document.getElementById("share-icon");

  shareIcon.addEventListener("click", () => {
    const currentUrl = window.location.href; // Get the current URL

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showMessage(
          "URL copied to clipboard. You can now share the blog post!",
          "success"
        );
      })
      .catch((error) => {
        showMessage("Failed to copy URL to clipboard.", "error");
        console.error("Error copying URL:", error);
      });
  });
});
