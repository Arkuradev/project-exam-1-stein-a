import { API_BLOG_EDIT_URL } from "./constants.mjs";

// Get postId and name from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");
const name = urlParams.get("name");

//Load post data when the page is loaded.
document.addEventListener("DOMContentLoaded", loadPostData);

// Fetch and display post data.
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
      document.getElementById("image-url").value = data.data.media.url;
      document.getElementById("image-alt").value = data.data.media.alt;
      document.getElementById("body").value = data.data.body;
      //Additional fields added later.
    } else {
      console.error("Failed to fetch post data:", data.message);
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

// Save edited post function.
export async function savePost() {
  const title = document.getElementById("title").value;
  const imageUrl = document.getElementById("image-url").value;
  const imageAlt = document.getElementById("image-alt").value;
  const body = document.getElementById("body").value;
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No auth token found");
    alert("You need to be logged in to edit posts.");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, imageUrl, imageAlt }),
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      alert("Post updated successfully.");
      console.log("Updated post data:", responseData.data);
      window.location.href = "../account/manage.html";
    } else {
      alert(
        "Failed to update post." + (responseData.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

//Make savePost globally accessible.
window.savePost = savePost;
