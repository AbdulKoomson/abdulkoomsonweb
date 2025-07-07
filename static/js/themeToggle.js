export function initThemeToggle() {
  const html = document.documentElement;
  const switchInput = document.querySelector(".switch input");
  const switchLabelText = document.querySelector(".switch label span:last-child");

  if (localStorage.getItem("dark-mode") === "false") {
    html.classList.add("light-mode");
    switchInput.checked = false;
    switchLabelText.textContent = "Light";
  }

  switchInput?.addEventListener("input", () => {
    const isLight = html.classList.toggle("light-mode");
    switchLabelText.textContent = isLight ? "Light" : "Dark";
    localStorage.setItem("dark-mode", isLight ? "false" : "true");
  });
}
// This function initializes the theme toggle functionality.