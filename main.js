"use strict";

// Make navbar transparent when it is on the top
const nav = document.querySelector("#navbar");
const navHeight = nav.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navHeight) {
    nav.classList.add("navbar--dark");
  } else {
    nav.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent asthe window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1.3 - window.scrollY / homeHeight;
});
document.addEventListener("scroll", () => {
  homeContactBtn.style.opacity = 1.3 - window.scrollY / homeHeight;
});
homeContactBtn.addEventListener("mouseover", () => {
  homeContactBtn.style.opacity = 1;
});
homeContactBtn.addEventListener("mouseout", () => {
  homeContactBtn.style.opacity = 1.3 - window.scrollY / homeHeight;
});

// Arrow-up button on Navbar
const arrowUp = document.querySelector(".navbar__arrowUp-btn");
document.addEventListener("scroll", () => {
  arrowUp.style.opacity = window.scrollY / navHeight;
  if (window.scrollY > 0) {
    arrowUp.style.pointerEvents = "auto";
  } else {
    arrowUp.style.pointerEvents = "none";
  }
});
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});
arrowUp.addEventListener("mouseover", () => {
  arrowUp.style.opacity = 1;
});
arrowUp.addEventListener("mouseout", () => {
  arrowUp.style.opacity = window.scrollY / navHeight;
});

function scrollIntoView(selector) {
  const scrollMove = document.querySelector(selector);
  const scrollValue =
    scrollMove.offsetTop - navHeight + 33 < 0
      ? 0
      : scrollMove.offsetTop - navHeight + 33;
  window.scrollTo({
    top: scrollValue,
    left: 0,
    behavior: "smooth",
  });
}
