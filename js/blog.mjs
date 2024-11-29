document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const name = urlParams.get("name");

  if (!postId || !name) {
    document.body.innerHTML = "<p>Error: Missing post information.</p>";
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
      document.body.innerHTML = "<p>Error: Failed to fetch blog post.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    document.body.innerHTML =
      "<p>Error: Failed to fetch blog post. Please try again. later</p>";
  }
});

// Function to set page title and meta description in specific blog post.

async function loadBlogPost() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("postId");
  const name = params.get("name");

  if (!postId || !name) {
    console.error("Missing postId or name in URL");
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
        document.getElementById("post-created").textContent = "Invalid date";
      }

      document.getElementById("post-title").textContent = postTitle;
      document.getElementById("post-body").textContent = postBody;
    } else {
      console.error("Failed to fetch blog post:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call function when page loads
document.addEventListener("DOMContentLoaded", loadBlogPost);
