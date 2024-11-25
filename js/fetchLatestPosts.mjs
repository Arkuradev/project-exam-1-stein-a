// Fetching data from the API.

const thumbnailGrid = document.getElementById("thumbnail-grid");

async function fetchLatestPosts() {
  const name = "steinarild";
  //Hard coded username because noroff blog api cannot fetch data unless its tied to a user.
  // This is a limitation of the API. (I was using localStorage.getItem("name") before)
  const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}?limit=12&sort=created&sortOrder=desc`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      renderThumbnails(data.data);
    } else {
      console.error("Failed to fetch blog posts:", data.message);
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

function renderThumbnails(posts) {
  thumbnailGrid.innerHTML = "";

  posts.forEach((post) => {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    thumbnail.innerHTML = `<a class="thumbnail-link" href="/project-exam-1-stein-a/post/blog.html?name=${
      post.author?.name
    }&postId=${post.id}">
    <img class="thumbnail-image" src="${
      post.media?.url || "No image available"
    }" alt="${post.media?.alt || "No image available"}">
    <div class="thumbnail-content"></div>
      <h3 class="thumbnail-title">${post.title}</h3>
      <p class="thumbnail-body">${post.body.slice(0, 100)}...</p>
      
    </div></a>`;
    // <button onclick="openBlogPost('${post.author?.name}', '${post.id}')"> REMOVE THIS IF NEEDED!
    thumbnailGrid.appendChild(thumbnail);
  });
}

function openBlogPost(name, postId) {
  const baseUrl =
    "https://arkuradev.github.io/project-exam-1-stein-a/blog.html";
  window.location.href = `${baseUrl}?name=${name}&postId=${postId}`;
}

document.addEventListener("DOMContentLoaded", fetchLatestPosts);
