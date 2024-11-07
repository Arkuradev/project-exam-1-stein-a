import { token } from "./constants.mjs";
import { NoroffAPIKey } from "./constants.mjs";
import { loginUser } from "./login.mjs";

async function createBlogPost(token, name, title, body) {
  const postUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;
  const postData = {
    title: title,
    body: body,
  };

  try {
    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": NoroffAPIKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Blog post created:", data);
      return data;
    } else {
      console.log("Failed to create blog post:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
  }
}

(async function () {
  const token = await loginUser("gamerblog@stud.noroff.no", "Annabelle1099"); //Logging in.
  const name = "steinarild";
  if (token) {
    await createBlogPost(
      token,
      name,
      "My new blog post",
      "This is my new blog post."
    );
  }
})();
