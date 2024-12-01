// Utility function

// Shows spinner.
function showLoading() {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.classList.remove("hidden");
}

// Hides spinner.
function hideLoading() {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.classList.add("hidden");
}

export { showLoading, hideLoading };
