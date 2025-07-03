import { initMenu } from './menu.js';
import { initThemeToggle } from './themeToggle.js';
import { initMenuTooltips } from './tooltip.js';
import { initScrollToTop } from './scrollToTop.js';
import { initPagination } from './pagination.js';

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initThemeToggle();
  initMenuTooltips();
  initScrollToTop();
  initPagination();
});
// This is the main entry point for the JavaScript functionality of the website.