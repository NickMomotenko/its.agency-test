let burger = document.querySelector(".burger");
let overlay = document.querySelector(".overlay");
let body = document.querySelector("body");

let links = document.querySelectorAll(".overlay .menu__link");

links.forEach(function (element) {
  element.addEventListener("click", toggleMenu);
});

function toggleMenu() {
  burger.classList.toggle("active");
  overlay.classList.toggle("active");
  body.classList.toggle("active");
}

burger.addEventListener("click", toggleMenu);
