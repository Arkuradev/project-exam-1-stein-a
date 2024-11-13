import { API_BLOG_EDIT_URL } from "./constants.mjs";
import { renderAdminPanel } from "./renderAdminPanel.mjs";

// Function to refer user to the edit page when Edit button is clicked.

// Edit page script
document.addEventListener("DOMContentLoaded", async () => {
  const urlPrams = new URLSearchParams(window.location.search);
  const postId = urlPrams.get("postId");

  if (!postId) {
    console.error("Post ID is missing");
    return;
  }

  try {
    const response = await fetch(`${API_BLOG_EDIT_URL}`);
    const post = await response.json();
    console.log(post);

    document.getElementById("title").value = post.title;
    document.getElementById("body").value = post.body;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
});

// Save edited post function.

async function savePost(name, postId) {
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
    console.log(responseData);

    if (response.ok) {
      alert("Post updated successfully.");
      console.log("Updated post data:", responseData.data);
      window.location.href = "/manage.html";
    } else {
      alert(
        "Failed to update post." + (responseData.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

// Get postId and name from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");
const name = urlParams.get("name");

//Fetch post data
async function loadPostData() {
  if (!postId || !name) {
    console.error("Missing postId or name in URL");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`
    );
    const data = await response.json();

    if (response.ok) {
      document.getElementById("title").value = data.data.title;
      document.getElementById("body").value = data.data.body;
      //tags go here if added.
    } else {
      console.error("Failed to fetch post data:", data.message);
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPostData);

/* let currentEditPostId = null;

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
*/
