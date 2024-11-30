// function for logging out of the blog.
/*
async function logOutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("name");
  window.location.href = "./login.html";
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logOutUser);
} */

document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");

  const checkLoginStatus = () => {
    const username = localStorage.getItem("name");

    if (username) {
      logoutLink.style.display = "block";
    } else {
      logoutLink.style.display = "none";
    }
  };

  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");

    // Reset the log out link
    logoutLink.style.display = "none";

    // Redirect to login page
    window.location.href = "./index.html";
  });

  checkLoginStatus();
});
