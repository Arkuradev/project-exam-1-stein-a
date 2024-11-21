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
