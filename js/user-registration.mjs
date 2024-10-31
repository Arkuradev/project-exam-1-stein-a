const registerForm = document.getElementById("registerForm");
import { register } from "./register.mjs";

registerForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from reloading the page

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  register(name, email, password);
});
