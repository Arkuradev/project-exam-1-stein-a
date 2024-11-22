// Function to check if the user is logged in and retrieve user information.
/*
function getUserInfo() {
  const token = localStorage.getItem("authToken"); //Get token from localStorage

  if (token) {
    try {
      const user = JSON.parse(atob(token.split(".")[1])); //Decode token
      return user.name; //Return user name
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
} */

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

/*
  const desktopLogin = document.getElementById("desktop-login");
  const mobileLogin = document.getElementById("mobile-login");

  if (username) {
    // If user is logged in update the link
    if (desktopLogin) {
      desktopLogin.textContent = username; // Update login link on desktop (not mobile).
      desktopLogin.onclick = () => {
        window.location.href = "/project-exam-1-stein-a/account/manage.html";
      };
    }
    if (mobileLogin) {
      mobileLogin.textContent = username; // Update login link on mobile (not desktop).
      mobileLogin.onclick = () => {
        window.location.href = "/project-exam-1-stein-a/account/manage.html";
      };
    }
  } else {
    // The user is not logged in, dont update the link.
    if (desktopLogin) {
      desktopLogin.textContent = "Login";
      desktopLogin.onclick = () => {
        window.location.href = "/project-exam-1-stein-a/account/login.html";
      };
    }

    if (mobileLogin) {
      mobileLogin.textContent = "Login";
      mobileLogin.onclick = () => {
        window.location.href = "/project-exam-1-stein-a/account/login.html";
      };
    }
  }
}

*/

/* loginLink.textContent = userName;
    loginLink.href = "/project-exam-1-stein-a/account/manage.html";

    // Makes username link not work if on manage.html due to pathing issues.
    loginLink.addEventListener("click", (event) => {
      if (window.location.pathname.includes("manage.html")) {
        event.preventDefault();
      }
    });
  } else {
    // The user is not logged in, dont update the link.
    loginLink.textContent = "Login";
    loginLink.href = "./account/login.html";
  }
} */

// Run on page load.
document.addEventListener("DOMContentLoaded", updateNavbar);
