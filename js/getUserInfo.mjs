// Updates the navbar after user has logged in so the user can click on their name and be redirected to manage page.
function updateNavbar() {
  const username = localStorage.getItem("name");
  // Selecting login link on both mobile and desktop

  const loginButtons = document.querySelectorAll(".login-button");

  loginButtons.forEach((button) => {
    if (username) {
      button.textContent = username;
      button.onclick = () => {
        window.location.href = "/project-exam-1-stein-a/account/manage.html";
      };
    } else {
      button.textContent = "Login";
      button.onclick = () => {
        window.location.href = "/project-exam-1-stein-a/account/login.html";
      };
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const usernameLinks = document.querySelectorAll(".login-button");
  const managePageUrl = "/project-exam-1-stein-a/account/manage.html";

  usernameLinks.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      if (window.location.pathname === managePageUrl) {
        window.location.reload();
      } else {
        window.location.href = managePageUrl;
      }
    });
  });
});

// Run on page load.
document.addEventListener("DOMContentLoaded", updateNavbar);
