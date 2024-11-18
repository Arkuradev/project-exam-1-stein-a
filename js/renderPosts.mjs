export function renderBlogPost(posts) {
  const container = document.getElementById("blogPostsContainer");
  container.innerHTML = "";

  if (posts && posts.data) {
    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      const imageUrl = post.media?.url || ""; // Fallback to an empty string if no URL
      const imageAlt = post.media?.alt || "No description available"; // Fallback to an empty string if no alt text
      postElement.classList.add("blog-post");
      postElement.innerHTML = `
    

    <h2>${post.title}</h2>
    ${
      imageUrl
        ? `<img src="${imageUrl}" id="postImage" alt="${imageAlt}">`
        : "<p>No image available</p>"
    }
    <p>${post.body}</p>
    
    <hr>
    `;

      container.appendChild(postElement);
    });
  } else {
    console.error("No posts found.", posts);
  }
}
