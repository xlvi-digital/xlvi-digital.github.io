/* ================ menu icon=============*/
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let darkModeIcon = document.querySelector("#darkMode-icon");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/* ================ scroll sections active link =============*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let logo = document.querySelector(".header img"); // Select the logo image
let originalLogoSrc = logo.src; // Save the original logo source
let stickyLogoSrc = "images/mylogo.png"; // Set the new logo source for sticky state
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
      });
    }
  });

  /* ================ sticky navbar =============*/
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Change logo when sticky
  if (header.classList.contains("sticky")) {
    logo.src = stickyLogoSrc; // Change to sticky logo
    menu.style.color = "#333";
  } else {
    logo.src = originalLogoSrc;
    menu.style.color = "#fdfdfd"; // Revert to original logo
  }

  /* ================ remove menu icon when click navbar link (scroll) =============*/

  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/* ================ dark light mode =============*/

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
  // logo.src = originalLogoSrc;
};
