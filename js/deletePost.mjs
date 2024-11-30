import { NoroffAPIKey } from "./constants.mjs";
import { renderAdminPanel } from "./renderAdminPanel.mjs";
import { showMessage } from "./errorDisplay.mjs";

export async function deletePost(postId, token, name) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (confirmDelete) {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": NoroffAPIKey,
          },
        }
      );

      if (response.ok) {
        showMessage("Post deleted successfully.", "success");

        renderAdminPanel(token, name); //Refresh the list of posts.
      } else {
        showMessage("Failed to delete post.", "error");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      showMessage("An error occurred while deleting the post.", "error");
    }
  }
}
