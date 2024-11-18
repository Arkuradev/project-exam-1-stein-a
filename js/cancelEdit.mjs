//Cancel editing a post. Redirects player to the manage page when cancel is clicked.

document.getElementById("cancelBtn").addEventListener("click", () => {
  window.location.href = "../account/manage.html";
});
