const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const images = Array.from(document.querySelectorAll(".gallery-item img"));
const closeButton = document.querySelector(".close");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;
let zoomLevel = 1;

function updateModalImage() {
    const currentImage = images[currentIndex];
    modalImg.src = currentImage.src;
    modalImg.alt = currentImage.alt;
    captionText.textContent = currentImage.alt;
    zoomLevel = 1;
    modalImg.style.transform = "scale(1)";
}

function openModal(index) {
    currentIndex = index;
    updateModalImage();
    modal.classList.add("is-open");
}

function closeModal() {
    modal.classList.remove("is-open");
    modalImg.removeAttribute("src");
}

function showPrevious() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    updateModalImage();
}

function showNext() {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    updateModalImage();
}

images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
});

closeButton.addEventListener("click", closeModal);
prevButton.addEventListener("click", showPrevious);
nextButton.addEventListener("click", showNext);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

modalImg.addEventListener("click", () => {
    zoomLevel = zoomLevel === 1 ? 2 : 1;
    modalImg.style.transform = `scale(${zoomLevel})`;
});

modalImg.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomLevel = event.deltaY < 0
        ? Math.min(zoomLevel + 0.1, 3)
        : Math.max(zoomLevel - 0.1, 1);
    modalImg.style.transform = `scale(${zoomLevel})`;
});

window.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) {
        return;
    }

    if (event.key === "Escape") {
        closeModal();
    } else if (event.key === "ArrowLeft") {
        showPrevious();
    } else if (event.key === "ArrowRight") {
        showNext();
    }
});
