import { loginUser } from "./login.mjs";
import { getBlogPosts } from "./getBlogPosts.mjs";
import { deletePost } from "./deletePost.mjs";

window.openEditPage = function (name, postId) {
  const baseUrl = "https://arkuradev.github.io/project-exam-1-stein-a";
  const editUrl = `${baseUrl}/post/edit.html?name=${name}&postId=${postId}`;
  window.location.href = editUrl;
};
// /editPost.html?postId=${postId}&name=${name}
// /editPost.html?name=${name}&postId=${postId}

export async function renderAdminPanel(token, name) {
  const posts = await getBlogPosts(token, name);
  const postsTableBody = document.querySelector("#postsTable tbody");

  postsTableBody.innerHTML = ""; //Clear existing rows. To avoid duplicates.

  posts.data.forEach((post) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td>${post.title}</td>
  <td>
    <button class="edit-btn" onclick="openEditPage('${name}', '${post.id}')">Edit</button>
    <button class="delete-btn">Delete</button>
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

// FIX THIS FUNCTION

(async function () {
  const token = await loginUser("gamerblog@stud.noroff.no", "Annabelle1099"); //Logging in.
  const name = "steinarild";

  if (token) {
    renderAdminPanel(token, name);
  }
})();
