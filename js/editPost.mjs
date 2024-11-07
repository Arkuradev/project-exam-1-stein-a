let currentEditPostId = null;

function editPost(postId, token) {
  currentEditPostId = postId;

  document.getElementById("editTitle").value = post.title;
  document.getElementById("editBody").value = post.body;
  document.getElementById("editPostForm").style.display = "block";
}

// Save edit
async function saveEdit(token, name) {
  const updatedTitle = document.getElementById("editTitle").value;
  const updatedBody = document.getElementById("editBody").value;

  try {
    await fetch(`https://v2.api.noroff.dev/blog/posts/${currentEditPostId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": NoroffAPIKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, body: updatedBody }),
    });

    if (response.ok) {
      alert("Post updated successfully.");
      document.getElementById("editPostForm").style.display = "none";
      renderAdminPanel(token, name); // Refresh the post list.
    } else {
      alert("Failed to update post.");
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

// Cancel edit.
function cancelEdit() {
  document.getElementById("editPostForm").style.display = "none";
}
