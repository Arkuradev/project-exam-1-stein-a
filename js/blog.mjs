import { showMessage } from "./errorDisplay.mjs";
import { showLoading, hideLoading } from "./loadingSpinner.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  showLoading();
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const name = urlParams.get("name");

  if (!postId || !name) {
    showMessage("Invalid blog post URL.", "error");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`
    );
    const postData = await response.json();

    if (response.ok) {
      document.getElementById("post-title").textContent = postData.data.title;
      document.getElementById("post-body").textContent = postData.data.body;
      document.getElementById("post-author").textContent =
        "Author: " + postData.data.author?.name;

      const image = document.getElementById("post-img");
      if (postData.data.media?.url) {
        image.src = postData.data.media.url;
        image.alt = postData.data.media.alt || "Blog image";
      } else {
        image.style.display = "none";
      }
    } else {
      console.error("Failed to fetch blog post:", data.message);
      showMessage("Failed to fetch blog post.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage("An error occurred while fetching the blog post.", "error");
  }
  hideLoading();
});

// Function to set page title and meta description in specific blog post.

async function loadBlogPost() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("postId");
  const name = params.get("name");

  if (!postId || !name) {
    console.error("Missing postId or name in URL");
    showMessage("Missing name or post ID in URL.", "error");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`
    );
    const postData = await response.json();

    if (response.ok) {
      const postTitle = postData.data.title;
      const postBody = postData.data.body;
      const created = postData.data.created;

      //Update the page title
      document.title = postTitle;

      //Update the meta title
      const metaTitle = document.querySelector('meta[name="title"]');
      if (metaTitle) {
        metaTitle.setAttribute("content", postTitle);
      } else {
        // If no meta title exists
        const newMetaTitle = document.createElement("meta");
        newMetaTitle.name = "title";
        newMetaTitle.content = postTitle;
        document.head.appendChild(newMetaTitle);
      }
      //Update the meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", postBody.substring(0, 150)); //Using first 150 characters as meta description
      } else {
        // If no meta description exists
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = postBody.substring(0, 150);
        document.head.appendChild(newMetaDescription);
      }

      const createdDate = new Date(created);
      // Formatting date to use norwegian/european date format.
      if (!isNaN(createdDate)) {
        const formattedDate = createdDate.toLocaleDateString("no-NO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        document.getElementById("post-created").textContent =
          "Blog posted: " + formattedDate;
      } else {
        console.error("Invalid date:", created);
        showMessage("Invalid date.", "error");
        document.getElementById("post-created").textContent = "Invalid date";
      }

      document.getElementById("post-title").textContent = postTitle;
      document.getElementById("post-body").textContent = postBody;
    } else {
      console.error("Failed to fetch blog post:", data.message);
      showMessage("Failed to fetch blog post.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage("An error occurred while fetching the blog post.", "error");
  }
}

// Call function when page loads
document.addEventListener("DOMContentLoaded", loadBlogPost);
