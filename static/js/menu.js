export function initMenu() {
  const body = document.body;
  const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
  const toggleMobileMenu = document.querySelector(".toggle-mob-menu");

  collapseBtn?.addEventListener("click", function () {
    body.classList.toggle("collapsed");
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !expanded);
    this.setAttribute("aria-label", expanded ? "expand menu" : "collapse menu");
  });

  toggleMobileMenu?.addEventListener("click", function () {
    body.classList.toggle("mob-menu-opened");
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !expanded);
    this.setAttribute("aria-label", expanded ? "open menu" : "close menu");
  });
}

// This function initializes the admin menu functionality, including collapsing and expanding the menu. # Entry point: imports and runs all other modules