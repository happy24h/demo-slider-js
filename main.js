let currentIndex = 0;
let isDragging = false;
let startX = 0;
let initialTranslateX = 0;

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

function updateSlider() {
  const slideWidth = slides[0].clientWidth;
  const translateX = -currentIndex * slideWidth;
  slider.style.transform = `translateX(${translateX}px)`;
}

function updateSlideWidth() {
  const containerWidth =
    document.querySelector(".slider-container").clientWidth;
  slides.forEach((slide) => (slide.style.width = containerWidth + "px"));
  updateSlider();
}

function disableNext() {
  return currentIndex === slides.length - 1;
}

function disablePrev() {
  return currentIndex === 0;
}

window.addEventListener("load", () => {
  updateSlideWidth();
  updateSlider();
});

window.addEventListener("resize", () => {
  updateSlideWidth();
  updateSlider();
});

slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  initialTranslateX = -currentIndex * slides[0].clientWidth;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const distance = e.clientX - startX;
    const newTranslateX = initialTranslateX + distance;
    slider.style.transform = `translateX(${newTranslateX}px)`;
  }
});

slider.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false;
    slider.style.cursor = "grab";
    const distance = e.clientX - startX;
    if (Math.abs(distance) > slides[0].clientWidth / 2) {
      if (distance < 0 && !disableNext()) {
        currentIndex++;
      } else if (distance > 0 && !disablePrev()) {
        currentIndex--;
      }
    }
    updateSlider();
    handleButtonOpacity();
  }
});

slider.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    slider.style.cursor = "grab";
    updateSlider();
  }
});

nextButton.addEventListener("click", () => {
  if (!disableNext()) {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    handleButtonOpacity();
  }
});

prevButton.addEventListener("click", () => {
  if (!disablePrev()) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    handleButtonOpacity();
  }
});

function handleButtonOpacity() {
  if (currentIndex === 0) {
    prevButton.style.opacity = "0.5";
    nextButton.style.opacity = "1";
  } else if (currentIndex === slides.length - 1) {
    prevButton.style.opacity = "1";
    nextButton.style.opacity = "0.5";
  } else {
    prevButton.style.opacity = "1";
    nextButton.style.opacity = "1";
  }
}
