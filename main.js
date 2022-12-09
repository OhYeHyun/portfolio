"use strict";

// Make navbar transparent when it is on the top
const nav = document.querySelector("#navbar");
const navHeight = nav.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  navbarMenu.classList.remove("open");

  if (window.scrollY > navHeight) {
    nav.classList.add("navbar--dark");
  } else {
    nav.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// button selected when click items
selectedBtn(".navbar__menu", ".navbar__menu__item");
selectedBtn(".work__categories", ".category__btn");

// Nav toggleBtn for small screen
const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent asthe window scrolls down
const home = document.querySelector(".home__container");
const about = document.querySelector(".about__container");
const aboutTop = about.getBoundingClientRect().top;
document.addEventListener("scroll", () => {
  home.style.opacity =
    1 - window.scrollY / aboutTop >= 0 ? 1.15 - window.scrollY / aboutTop : 0;
});
document.addEventListener("scroll", () => {
  homeContactBtn.style.opacity =
    1 - window.scrollY / aboutTop >= 0 ? 1.15 - window.scrollY / aboutTop : 0;
});
homeContactBtn.addEventListener("mouseover", () => {
  homeContactBtn.style.opacity = 1;
});
homeContactBtn.addEventListener("mouseout", () => {
  homeContactBtn.style.opacity =
    1 - window.scrollY / aboutTop >= 0 ? 1.15 - window.scrollY / aboutTop : 0;
});

// Arrow-up button on Navbar
const arrowUp = document.querySelector(".navbar__arrowUp-btn");
document.addEventListener("scroll", () => {
  arrowUp.style.opacity =
    window.scrollY / navHeight >= 0 ? window.scrollY / navHeight : 0;
  if (window.scrollY > 0) {
    arrowUp.style.pointerEvents = "auto";
  } else {
    arrowUp.style.pointerEvents = "none";
  }
});
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");

  // Initialization when click Arrow-up button
  const selectedNav = document.querySelector(".navbar__menu__item.selected");
  const homeBtn = navbarMenu.childNodes.item(1);
  selectedNav.classList.remove("selected");
  homeBtn.classList.add("selected");

  const selectedCate = document.querySelector(".category__btn.selected");
  const allBtn = workBtnContainer.childNodes.item(1);
  selectedCate.classList.remove("selected");
  allBtn.classList.add("selected");

  projects.forEach((project) => {
    project.classList.remove("invisible");
  });
});
arrowUp.addEventListener("mouseover", () => {
  arrowUp.style.opacity = 1;
});
arrowUp.addEventListener("mouseout", () => {
  arrowUp.style.opacity = window.scrollY / navHeight;
});

// Project Filtering
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.sort) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

const homeTop = document.querySelector("#home").offsetTop;
const aboutTop1 = document.querySelector("#about").offsetTop;
const skillsTop = document.querySelector("#skills").offsetTop;
const workTop = document.querySelector("#work").offsetTop;
const testimonialsTop = document.querySelector("#testimonials").offsetTop;
const contactTop = document.querySelector("#contact").offsetTop;

const selectedNav = document.querySelector(".navbar__menu__item.selected");
const homeBtn = navbarMenu.childNodes.item(1);
selectedNav.classList.remove("selected");
homeBtn.classList.add("selected");

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

function selectedBtn(parentClass, childClass) {
  const parent = document.querySelector(parentClass);
  parent.addEventListener("click", (e) => {
    const selected = document.querySelector(childClass + ".selected");
    if (e.target.nodeName === "BUTTON" || e.target.parentNode === "BUTTON") {
      const target =
        e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
      target.classList.add("selected");
    } else {
      e.target.classList.add("selected");
    }
    selected.classList.remove("selected");
  });
}

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("selected");
  selectedNavItem = selected;
  selectedNavItem.classList.add("selected");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
