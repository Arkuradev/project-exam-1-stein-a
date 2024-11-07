import { NoroffAPIKey } from "./constants.mjs";
import { renderAdminPanel } from "./renderAdminPanel.mjs";

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

      //Log the response details
      console.log("Response status: ", response.status);
      console.log(postId);
      console.log("Response status text: ", response.statusText);

      if (response.ok) {
        alert("Post deleted successfully.");

        renderAdminPanel(token, name); //Refresh the list of posts.
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
}
