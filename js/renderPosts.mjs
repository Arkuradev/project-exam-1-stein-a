export function renderBlogPost(posts) {
  const container = document.getElementById("blogPostsContainer");
  // container.innerHTML = "";

  if (posts && posts.data) {
    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("blog-post");

      postElement.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    
    <hr>
    `;

      container.appendChild(postElement);
    });
  } else {
    console.error("No posts found.", posts);
  }
}
