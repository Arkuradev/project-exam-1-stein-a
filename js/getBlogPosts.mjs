import { NoroffAPIKey } from "./constants.mjs";
import { showMessage } from "./errorDisplay.mjs";
import { renderBlogPost } from "./renderPosts.mjs";
import { showLoading, hideLoading } from "./loadingSpinner.mjs";
export async function getBlogPosts(token, name) {
  const postUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;

  showLoading(); //Show loading spinner before starting the fetch operation

  try {
    const response = await fetch(postUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": NoroffAPIKey,
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      showMessage("Failed to retrieve blog posts.", "error");
    }
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    showMessage("An error occurred while retrieving blog posts.", "error");
  } finally {
    hideLoading(); //Hide loading spinner after the fetch operation is complete
  }
}

//Function to render posts on the Home page for user.
(async function () {
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

  if (token && name) {
    showLoading();
    const posts = await getBlogPosts(token, name);
    hideLoading();
    if (posts) {
      renderBlogPost(posts);
    }
  }
})();
