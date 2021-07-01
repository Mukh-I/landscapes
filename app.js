const navLists = document.querySelectorAll(".nav__list");
const sections = document.querySelectorAll("section");
const home = document.querySelector("#home");
const navContainer = document.querySelector(".nav-container");
const goToServicesBtn = document.querySelector('.btn-green[href="#services"]');
const mobileNav = document.querySelector(".mobile-nav");
const mobileMenu = document.querySelector(".mobile-menu");

const goToSection = (e) => {
  e.preventDefault();
  if (e.target.tagName !== "A") return;
  const linkHref = e.target.getAttribute("href").replace("#", "");
  if (linkHref === home.id) home.scrollIntoView({ behavior: "smooth" });
  sections.forEach((section) => {
    if (linkHref === section.id) section.scrollIntoView({ behavior: "smooth" });
  });
  if (e.target.closest(".slide-up")) mobileNav.classList.remove("slide-up");
};

// smooth scroll
navLists.forEach((navList) =>
  navList.addEventListener("click", goToSection.bind())
);

// hamburger menu
mobileMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("slide-up");
});

// sticky nav
const navHeight = navContainer.getBoundingClientRect().height;

const handleStickyNav = (entries) => {
  const [entry] = entries;
  entry.isIntersecting
    ? navContainer.classList.remove("sticky")
    : navContainer.classList.add("sticky");
};

const headerObserver = new IntersectionObserver(handleStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(home);

goToServicesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
});

// tabs
const tabContainer = document.querySelector(".tabs");
const tabBtns = document.querySelectorAll(".tabs__btn");
const cards = document.querySelectorAll(".card");

tabContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName !== "BUTTON") return;

  tabBtns.forEach((tabBtn) => {
    tabBtn.classList.remove("active");
  });

  target.classList.add("active");

  cards.forEach((card) => {
    card.classList.remove("show-card");
  });

  const tabNum = target.dataset.tab;

  const cardToShow = document.querySelector(`.tabs__content-${tabNum}`);
  cardToShow.classList.add("show-card");
});

// Testimonials
const reviews = document.querySelectorAll(".review");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

reviews.forEach((review, index) => {
  review.style.transform = `translateX(${100 * index}%)`;
});

let currentReview = 0;
const lastReview = reviews.length - 1;

nextBtn.addEventListener("click", function () {
  if (currentReview !== lastReview) {
    currentReview++;
    displayReviewe(currentReview);
  }
});
prevBtn.addEventListener("click", function () {
  if (currentReview < 1) return;
  currentReview--;
  displayReviewe(currentReview);
});

function displayReviewe(currentReview) {
  reviews.forEach((review, index) => {
    review.style.transform = `translateX(${110 * (index - currentReview)}%)`;
  });
}
