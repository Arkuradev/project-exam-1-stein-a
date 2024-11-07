import { loginUser } from "./login.mjs";
import { getBlogPosts } from "./getBlogPosts.mjs";
import { deletePost } from "./deletePost.mjs";

export async function renderAdminPanel(token, name) {
  const posts = await getBlogPosts(token, name);
  const postsTableBody = document.querySelector("#postsTable tbody");

  postsTableBody.innerHTML = ""; //Clear existing rows. To avoid duplicates.

  posts.data.forEach((post) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td>${post.title}</td>
  <td>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </td>
`;

    // Add event listeners

    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");

    editButton.addEventListener("click", () => editPost(post, token));
    deleteButton.addEventListener("click", () =>
      deletePost(post.id, token, name)
    );

    postsTableBody.appendChild(row);
  });
}
(async function () {
  const token = await loginUser("gamerblog@stud.noroff.no", "Annabelle1099"); //Logging in.
  const name = "steinarild";

  if (token) {
    renderAdminPanel(token, name);
  }
})();
