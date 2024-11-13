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

window.savePost = savePost;
