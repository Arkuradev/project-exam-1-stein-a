// Displays an error message on the page for the user if an error is presented.
// Refactored code to handle success messages too.

export function showMessage(message, type = "error") {
  let container = document.getElementById("error-container");

  container.textContent = message;
  container.style.color =
    type === "error" ? "red" : type === "success" ? "green" : "black";

  setTimeout(() => {
    container.textContent = "";
  }, 5000);
}
