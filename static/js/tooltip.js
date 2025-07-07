export function initMenuTooltips() {
  const menuLinks = document.querySelectorAll(".admin-menu a");

  menuLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const body = document.body;
      if (body.classList.contains("collapsed") && window.matchMedia("(min-width: 768px)").matches) {
        const tooltip = link.querySelector("span")?.textContent;
        if (tooltip) link.setAttribute("title", tooltip);
      } else {
        link.removeAttribute("title");
      }
    });
  });
}
// This function initializes tooltips for menu items in the admin menu.