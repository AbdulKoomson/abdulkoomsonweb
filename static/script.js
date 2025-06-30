const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (body.classList.contains(collapsedClass) && window.matchMedia("(min-width: 768px)").matches) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
  html.classList.toggle(lightModeClass);
  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = "Light";
    localStorage.setItem("dark-mode", "false");
  } else {
    switchLabelText.textContent = "Dark";
    localStorage.setItem("dark-mode", "true");
  }
});

// Get the button
let backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
backToTopBtn.addEventListener("click", function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// Configuration
const postsPerPage = 5;
let currentPage = 1;
const blogPosts = [
  {
    id: 1,
    title: "Welcome to My Startup Journey",
    subtitle: "Building an Object Detection Startup in Public",
    content:
      "I'm launching an object detection startup from scratch — no VC, no hype, no guarantees. This is my transparent journal of coding, experiments, wins, failures, and everything in between. If you're into AI, machine learning, or curious about the behind-the-scenes startup grind, you're in the right place!",
    image: "/static/pictures/ChatGPT%20Image%20Jun%203,%202025,%2012_10_24%20PM.png",
    author: "Abdul Koomson",
    date: "June 13, 2025",
    tags: ["AI", "ML", "Object Detection", "Startup"],
    readMoreLink: "/templates/posts/welcome-to-my-startup-journey.html",
    altStyle: false
  },
  {
    id: 2,
    title: "Why I Chose Object Detection",
    subtitle: "My startup bet on vision over hype",
    content:
      "Object detection is more than just bounding boxes. It's about enabling machines to see like humans. Here's how a road crack detection project led me down the rabbit hole—and why I'm building my AI startup around it.",
    image: "/static/pictures/2104.i105.023_isometric_public_security_illustration.jpg",
    author: "Abdul Koomson",
    date: "June 16, 2025",
    tags: ["AI", "Computer Vision", "Object Detection", "Startup"],
    readMoreLink: "/templates/posts/why-i-chose-object-detection.html",
    altStyle: true
  },
  {
    id: 3,
    title: "Accelerated ML & Cloud Deployment in Excel",
    subtitle: "Webinar recap using Analytic Solver Data Science",
    content:
      "Today I attended a webinar on Analytic Solver’s machine learning and deployment tools inside Excel. From classification trees to REST API integration, it was a great demo of Excel’s hidden AI potential.",
    image: "/static/pictures/061825 Analytic Solve Webinar/IMG_1836.PNG",
    author: "Abdul Koomson",
    date: "June 17, 2025",
    tags: ["Machine Learning", "Analytic Solve Webinar", "Excel", "Cloud Deployment"],
    readMoreLink: "/templates/posts/analytic-solver-ml-webinar-recap.html",
    altStyle: false
  },
  {
    id: 4,
    title: "My Stack: Tools, Frameworks, and Python Packages I Use",
    subtitle: "The Azure-powered AI stack behind my object detection startup",
    content:
      "Explore the real tech stack behind my AI startup using Azure cloud services, Mask R-CNN for object detection, and a streamlined ML pipeline designed to deploy fast and learn faster.",
    image: "/static/pictures/Azure diagram-2025-02-07-023321.png",
    author: "Abdul Koomson",
    date: "June 18, 2025",
    tags: ["Azure", "Mask R-CNN", "AI Stack", "Machine Learning", "Startup"],
    readMoreLink: "/templates/posts/my-ai-ml-tech-stack-tools-and-frameworks.html",
    altStyle: true
  },
  {
    id: 5,
    title: "How I Built My Website with HTML, CSS, JS, Flask, and Azure",
    subtitle: "A personal journey from frontend basics to a Flask-powered site with Azure Blob Storage",
    content:
      "My site, AbdulKoomson.com, is the 5th website I've built. It started with basic HTML/CSS/JS and now uses Flask and Azure Blob Storage to serve and share files dynamically.",
    image: "/static/pictures/ChatGPT Image Jun 25, 2025, 03_19_39 PM.png",
    author: "Abdul Koomson",
    date: "June 25, 2025",
    tags: ["Web Development", "HTML", "Flask", "Azure", "Portfolio"],
    readMoreLink: "/templates/posts/how-i-built-my-website-html-css-js-flask-azure.html",
    altStyle: false
  },
  {
    id: 6,
    title: "Designing My Startup Logo with AI and Online Tools",
    subtitle: "Exploring logo ideas using ChatGPT, Design.com, and more",
    content:
      "Today I explored different platforms to create my startup logo. From prompt-based logo generation on ChatGPT to design tools like Looka, Canva, and Design.com—here’s what inspired me.",
    image: "/static/pictures/ChatGPT Image Jun 30, 2025, 10_03_26 AM.png",
    author: "Abdul Koomson",
    date: "June 26, 2025",
    tags: ["Logo Design", "Startup", "Creativity", "AI Tools", "Branding"],
    readMoreLink: "/templates/posts/designing-my-startup-logo-ai-tools.html",
    altStyle: true
  },
  {
    id: 7,
    title: "About Me: Data Science & AI Specialist, Full-Stack Developer, Builder",
    subtitle: "A look behind the code and into my journey as a data-driven developer",
    content:
      "With a strong background in data science, AI, and web development, my journey blends deep technical skill with startup passion. Here's how I went from Civil Engineering to building intelligent systems.",
    image: "https://your-image-source.com/aboutme-profile-thumbnail.jpg",
    author: "Abdul Koomson",
    date: "June 27, 2025",
    tags: ["About Me", "Data Science", "AI", "Full Stack", "Founder Journey"],
    readMoreLink: "/templates/posts/aboutme.html",
    altStyle: true
  }
];

// DOM Elements
const blogPostsContainer = document.getElementById("blog-posts");
const paginationNumbers = document.getElementById("pagination-numbers");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

// Main functions
function initPagination() {
  displayPosts(currentPage);
  setupPagination();
  updateButtonStates();
}

function displayPosts(page) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = blogPosts.slice(startIndex, endIndex);

  blogPostsContainer.innerHTML = "";

  paginatedPosts.forEach((post) => {
    blogPostsContainer.innerHTML += createBlogCardHTML(post);
  });
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
            <ul>
              ${post.tags.map((tag) => `<li><a href="#">${tag}</a></li>`).join("")}
            </ul>
          </li>
        </ul>
      </div>
      <div class="description">
        <h1>${post.title}</h1>
        <h2>${post.subtitle}</h2>
        <p>${post.content}</p>
        <p class="read-more">
          <a href="${post.readMoreLink}">Read More</a>
        </p>
      </div>
    </div>
  `;
}

function setupPagination() {
  const pageCount = Math.ceil(blogPosts.length / postsPerPage);
  const paginationNumbers = document.getElementById("pagination-numbers");
  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `pagination-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="pagination-link" href="#">${i}</a>`;

    pageItem.addEventListener("click", createPageClickHandler(i));
    paginationNumbers.appendChild(pageItem);
  }
}

function createPageItem(pageNumber) {
  const pageItem = document.createElement("li");
  pageItem.className = `pagination-item ${pageNumber === currentPage ? "active" : ""}`;
  pageItem.innerHTML = `<a class="pagination-link" href="#">${pageNumber}</a>`;

  pageItem.addEventListener("click", createPageClickHandler(pageNumber));
  return pageItem;
}

function createPageClickHandler(pageNumber) {
  return function (e) {
    e.preventDefault();
    currentPage = pageNumber;
    displayPosts(currentPage);
    updatePaginationNumbers();
    updateButtonStates();
  };
}

function updatePaginationNumbers() {
  const pageItems = document.querySelectorAll("#pagination-numbers .pagination-item");
  pageItems.forEach((item) => {
    const itemPage = parseInt(item.textContent);
    item.classList.toggle("active", itemPage === currentPage);
  });
}

function updateButtonStates() {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  prevButton.classList.toggle("disabled", currentPage === 1);
  nextButton.classList.toggle("disabled", currentPage === totalPages);
}

// Event listeners
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

// Initialize
document.addEventListener("DOMContentLoaded", initPagination);

src = "https://unpkg.com/@panzoom/panzoom@9.4.0/dist/panzoom.min.js";
let panzoomInstance;
let startX = 0;

function openModal(img) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = img.src;

  // Initialize Panzoom
  const wrapper = document.querySelector(".modal-image-wrapper");
  panzoomInstance = Panzoom(modalImg, {
    maxScale: 5,
    contain: "outside"
  });
  wrapper.addEventListener("wheel", panzoomInstance.zoomWithWheel);

  // Swipe detection
  wrapper.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  wrapper.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0)
        alert("Swipe Right →"); // Replace with image navigation
      else alert("Swipe Left ←");
    }
  });
}

function closeModal(event) {
  // Prevent closing when clicking on the image itself
  if (event.target.id === "modalImage") return;

  const modal = document.getElementById("imgModal");
  modal.style.display = "none";

  // Destroy Panzoom instance
  if (panzoomInstance) {
    panzoomInstance.destroy();
    panzoomInstance = null;
  }
}
