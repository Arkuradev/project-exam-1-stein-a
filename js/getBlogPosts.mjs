import { NoroffAPIKey } from "./constants.mjs";
import { renderBlogPost } from "./renderPosts.mjs";
import { loginUser } from "./login.mjs";
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
      console.log("Blog posts retrieved:", data);
      return data;
    } else {
      console.log("Failed to retrieve blog posts:", response.statusText);
    }
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
  }
}

(async function () {
  const token = await loginUser("gamerblog@stud.noroff.no", "Annabelle1099"); //Logging in.
  const name = "steinarild";

  if (token) {
    const posts = await getBlogPosts(token, name);
    if (posts) {
      renderBlogPost(posts);
    }
  }
})();
