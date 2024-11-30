// function for logging out of the blog.

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logOutUser);
  }
});

async function logOutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("name");
  window.location.href = "./account/login.html";
}
