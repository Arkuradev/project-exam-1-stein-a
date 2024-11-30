import { NoroffAPIKey } from "./constants.mjs";
import { showMessage } from "./errorDisplay.mjs";

async function createBlogPost(token, name, title, body, imageUrl, imageAlt) {
  const postUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;
  const postData = {
    title: title,
    body: body,
    media: {
      url: imageUrl,
      alt: imageAlt,
    },
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
      showMessage("Blog post created successfully.", "success");
      return data;
    } else {
      showMessage("Failed to create blog post. Please try again", "error");
    }
  } catch (error) {
    showMessage("An error occurred while creating blog post.", "error");
    console.error("Error creating blog post:", error);
  }
}

function createPostForm() {
  const form = document.getElementById("createPostForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from submitting normally.

    const title = document.getElementById("title").value;
    const imageUrl = document.getElementById("image-url").value;
    const imageAlt = document.getElementById("image-alt").value;
    const body = document.getElementById("body").value;
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("name");

    if (token && name) {
      const newPost = await createBlogPost(
        token,
        name,
        title,
        body,
        imageUrl,
        imageAlt
      );

      if (newPost) {
        showMessage("Blog post created successfully.", "success");
        setTimeout(() => {
          form.reset(); // Reset the form after successful creation.
          window.location.href = `/project-exam-1-stein-a/account/manage.html`;
        }, 2000);
      }
    } else {
      showMessage("Please log in to create a blog post.", "error");
    }
  });
}

// Call createPostForm function to add event listener to the form.
document.addEventListener("DOMContentLoaded", createPostForm);
