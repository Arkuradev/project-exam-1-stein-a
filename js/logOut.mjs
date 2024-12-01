// function for logging out of the blog.

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logOutUser);
  }
});
// Clears local storage and redirects to login page.
async function logOutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("name");
  window.location.href = "./login.html";
}
