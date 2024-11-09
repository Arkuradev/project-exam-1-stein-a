// function for logging out of the blog.

async function logOutUser() {
  localStorage.removeItem("authToken");
  window.location.href = "./login.html";
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logOutUser());
}
