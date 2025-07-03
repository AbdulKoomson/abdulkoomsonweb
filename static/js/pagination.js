import { blogPosts } from './blogData.js';

export function initPagination() {
  const postsPerPage = 5;
  let currentPage = 1;

  const blogPostsContainer = document.getElementById("blog-posts");
  const paginationNumbers = document.getElementById("pagination-numbers");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  function displayPosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = blogPosts.slice(startIndex, endIndex);

    blogPostsContainer.innerHTML = paginatedPosts.map(createBlogCardHTML).join("");
  }

  function createBlogCardHTML(post) {
    return `
      <div class="blog-card ${post.altStyle ? "alt" : ""}">
        <div class="meta">
          ${
            post.image.includes("http")
              ? `<div class="photo" style="background-image: url(${post.image})"></div>`
              : `<img src="${post.image}" alt="blog photo" class="blog-photo" />`
          }
          <ul class="details">
            <li class="author"><a href="#">${post.author}</a></li>
            <li class="date">${post.date}</li>
            <li class="tags">
              <ul>${post.tags.map(tag => `<li><a href="#">${tag}</a></li>`).join("")}</ul>
            </li>
          </ul>
        </div>
        <div class="description">
          <h1>${post.title}</h1>
          <h2>${post.subtitle}</h2>
          <p>${post.content}</p>
          <p class="read-more"><a href="${post.readMoreLink}">Read More</a></p>
        </div>
      </div>
    `;
  }

  function updatePaginationNumbers() {
    paginationNumbers.innerHTML = "";
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const item = document.createElement("li");
      item.className = `pagination-item ${i === currentPage ? "active" : ""}`;
      item.innerHTML = `<a class="pagination-link" href="#">${i}</a>`;
      item.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        displayPosts(currentPage);
        updatePaginationNumbers();
        updateButtonStates();
      });
      paginationNumbers.appendChild(item);
    }
  }

  function updateButtonStates() {
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    prevButton.classList.toggle("disabled", currentPage === 1);
    nextButton.classList.toggle("disabled", currentPage === totalPages);
  }

  prevButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPosts(currentPage);
      updatePaginationNumbers();
      updateButtonStates();
    }
  });

  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage < Math.ceil(blogPosts.length / postsPerPage)) {
      currentPage++;
      displayPosts(currentPage);
      updatePaginationNumbers();
      updateButtonStates();
    }
  });

  displayPosts(currentPage);
  updatePaginationNumbers();
  updateButtonStates();
}
// This function initializes the pagination functionality for the blog posts.