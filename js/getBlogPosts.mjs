import { NoroffAPIKey } from "./constants.mjs";
import { showMessage } from "./errorDisplay.mjs";
import { renderBlogPost } from "./renderPosts.mjs";
export async function getBlogPosts(token, name) {
  const postUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;

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
  }
}

//Function to render posts on the Home page for user.
(async function () {
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

  if (token && name) {
    const posts = await getBlogPosts(token, name);
    if (posts) {
      renderBlogPost(posts);
    }
  }
})();
