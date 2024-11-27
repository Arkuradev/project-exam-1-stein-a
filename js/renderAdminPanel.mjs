import { getBlogPosts } from "./getBlogPosts.mjs";
import { deletePost } from "./deletePost.mjs";

window.openEditPage = function getBlogPosts(name, postId) {
  const baseUrl = "https://arkuradev.github.io/project-exam-1-stein-a";
  const editUrl = `${baseUrl}/post/edit.html?name=${name}&postId=${postId}`;
  window.location.href = editUrl;
};

export async function renderAdminPanel(token, name) {
  const posts = await getBlogPosts(token, name);
  const postsTableBody = document.querySelector("#postsTable tbody");

  postsTableBody.innerHTML = ""; //Clear existing rows. To avoid duplicates.

  posts.data.forEach((post) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td><a href="/project-exam-1-stein-a/post/blog.html?name=${name}&postId=${post.id}" target="_blank">${post.title}</a></td>
  <td>
    <button class="edit-btn button-5" onclick="openEditPage('${name}', '${post.id}')">Edit</button>
    <button class="delete-btn button-5">Delete</button>
  </td>
`;

    // Add event listeners

    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");

    editButton.addEventListener("click", () => editPost(name, token, post.id));
    deleteButton.addEventListener("click", () =>
      deletePost(post.id, token, name)
    );

    postsTableBody.appendChild(row);
  });
}

// Checking if user is logged in before rendering posts for the user. If no token
// is found, an error message is displayed.

(async function () {
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

  if (token) {
    renderAdminPanel(token, name);
  } else {
    console.error("User is not logged in or token is missing.");
  }
})();
