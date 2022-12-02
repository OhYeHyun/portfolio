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
  const scrollMove = document.querySelector(link);
  const scrollValue =
    scrollMove.offsetTop - navHeight < 0
      ? 0
      : scrollMove.offsetTop - navHeight + 33;
  if (link == null) {
    return;
  }
  window.scrollTo({
    top: scrollValue,
    left: 0,
    behavior: "smooth",
  });
});
