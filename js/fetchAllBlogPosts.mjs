export async function fetchAndRenderBlogs() {
  const blogGrid = document.getElementById("blog-thumbnails");
  const name = localStorage.getItem("name");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}`
    );
    const data = await response.json();
    //Clearing grid before rendering.
    blogGrid.innerHTML = "";

    //Iterating through the blog posts and creating thumbnails

    data.data.forEach((post) => {
      const thumbnail = document.createElement("div");
      thumbnail.classList.add("thumbnail");
      thumbnail.onclick = () => {
        //Navigating to the post when clicked.
        window.location.href = `/post/blog.html?name=${post.author?.name}&postId=${post.id}`;
      };
      // Rendering thumbnail content.
      thumbnail.innerHTML = `
      <img src="${post.media?.url}" alt="${post.media?.alt || post.title}">
      <div class="thumbnail-title">${post.title.slice(0, 15)}..</div>

      `;
      blogGrid.appendChild(thumbnail);
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    blogGrid.innerHTML;
  }
}

fetchAndRenderBlogs();
