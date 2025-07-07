export function openModal(img) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = img.src;

  const wrapper = document.querySelector(".modal-image-wrapper");
  const panzoomInstance = Panzoom(modalImg, { maxScale: 5, contain: "outside" });
  wrapper.addEventListener("wheel", panzoomInstance.zoomWithWheel);

  let startX = 0;

  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  wrapper.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 50) {
      alert(deltaX > 0 ? "Swipe Right →" : "Swipe Left ←");
    }
  });
}

export function closeModal(event) {
  if (event.target.id === "modalImage") return;
  const modal = document.getElementById("imgModal");
  modal.style.display = "none";
}

// Ensure the modal is closed when clicking outside the image
window.openModal = openModal;
window.closeModal = closeModal;

