const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;

// Fetch and render the latest 3 blog posts
async function fetchAndRenderSlider() {
  const name = "steinarild";
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}?limit=3&sort=created&sortOrder=desc`
    );
    const data = await response.json();

    const blogPosts = data.data;

    slider.innerHTML = ""; // Clear any existing content

    blogPosts.forEach((post) => {
      const slide = document.createElement("div");
      slide.classList.add("slider-item");
      slide.onclick = () => {
        // Navigating to the post when clicked.
        window.location.href = `/post/blog.html?name=${post.author?.name}&postId=${post.id}`;
      };
      slide.innerHTML = `
        <img src="${post.media?.url || "default-image.jpg"}" alt="${
        post.media?.alt || post.title
      }">
        <h3>${post.title}</h3>
      `;
      slider.appendChild(slide);
    });

    // Duplicate first and last slides for smooth looping
    const firstSlide = slider.children[0].cloneNode(true);
    const lastSlide =
      slider.children[slider.children.length - 1].cloneNode(true);

    slider.appendChild(firstSlide);
    slider.insertBefore(lastSlide, slider.children[0]);

    // Adjust the starting position
    slider.style.transform = `translateX(-100%)`;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

// Function to update the slider position
function updateSlider() {
  const totalSlides = slider.children.length;

  // Smoothly move to the next/previous slide
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

  // Reset to the start/end after transition for infinite looping
  slider.addEventListener(
    "transitionend",
    () => {
      if (currentIndex < 0) {
        currentIndex = totalSlides - 3; // Jump to the last real slide
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
      } else if (currentIndex >= totalSlides - 2) {
        currentIndex = 0; // Jump to the first real slide
        slider.style.transition = "none";
        slider.style.transform = `translateX(-100%)`;
      }
    },
    { once: true }
  );
}

// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
  currentIndex--;
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  updateSlider();
});

// Initialize slider on page load
fetchAndRenderSlider();
