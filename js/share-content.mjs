//Function to allow user to share blog post by clicking the share icon

document.addEventListener("DOMContentLoaded", () => {
  const shareIcon = document.getElementById("share-icon");
  const copyMessage = document.getElementById("copy-message");

  shareIcon.addEventListener("click", () => {
    const currentUrl = window.location.href; // Get the current URL

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        copyMessage.style.display = "block"; //Shows message
        setTimeout(() => {
          copyMessage.style.display = "none"; //Hides message after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying URL:", error);
      });
  });
});
