// Function to check if the user is logged in and retrieve user information.

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
}

// Updates the navbar after user has logged in so the user can click on their name and be redirected to manage page.
function updateNavbar() {
  const userName = getUserInfo();
  const loginLink = document.querySelector(".login-link");

  if (userName) {
    // If user is logged in update the link.
    loginLink.textContent = userName;
    loginLink.href = "./account/manage.html";

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
}

// Run on page load.
document.addEventListener("DOMContentLoaded", updateNavbar);
