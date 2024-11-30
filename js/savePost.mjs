import { showMessage } from "./messages.mjs";
export async function savePost(name, postId) {
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      setTimeout(() => {
        showMessage("Post updated successfully.", "success");
        window.location.href = "/manage.html";
      }, 2000);
    } else {
      showMessage(
        "Failed to update post." +
          (responseData.message || "Unknown error", "error")
      );
    }
  } catch (error) {
    console.error("Error updating post:", error);
    showMessage("An error occurred while updating the post.", "error");
  }
}

window.savePost = savePost;
