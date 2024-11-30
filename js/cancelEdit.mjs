//Cancel editing a post. Redirects player to the manage page when cancel is clicked.

import { showMessage } from "./errorDisplay.mjs";

document.getElementById("cancelBtn").addEventListener("click", () => {
  showMessage("Cancelled editing. Going back to manage page.", "success");
  setTimeout(() => {
    window.location.href = "../account/manage.html";
  }, 2000);
});
