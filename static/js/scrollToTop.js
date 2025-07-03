export function initScrollToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.onscroll = () => {
    backToTopBtn.style.display =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? "block" : "none";
  };

  backToTopBtn?.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
// This function initializes the "scroll to top" button functionality.