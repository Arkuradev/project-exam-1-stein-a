export function renderBlogPost(posts) {
  if (posts && posts.data) {
    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      const imageUrl = post.media?.url || ""; // Fallback to an empty string if no URL
      const imageAlt = post.media?.alt || "No description available"; // Fallback to an empty string if no alt text
      const authorName = post.author?.name || "UnknownAuthor";
      postElement.classList.add("blog-post");
      postElement.innerHTML = `
    

    <h2>${post.title}</h2>
    ${
      imageUrl
        ? `<img src="${imageUrl}" id="postImage" alt="${imageAlt}">`
        : "<p>No image available</p>"
    }
    <p>${post.body.slice(0, 100)}...</p>
    <a href="/project-exam-1-stein-a/post/blog.html?name=${authorName}&postId=${
        post.id
      }">Read more about ${post.title}</a>
    
    <hr>
    `;
    });
  } else {
    console.error("No posts found.", posts);
  }
}
