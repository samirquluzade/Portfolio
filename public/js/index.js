import "regenerator-runtime/runtime";
import { deleteMessage, sendMessage } from "./message";
import { login } from "./login";
import Swal from "sweetalert2";

let deleteBtn = document.querySelectorAll(".message-delete");

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", function () {
    deleteMessage(this.id);
  });
}

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  //Active link
  navLink.forEach(n => n.classList.remove("active"));
  this.classList.add("active");
  //Remove menu
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach(n => n.addEventListener("click", linkAction));

const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});
sr.reveal(".home__title", {});
sr.reveal(".button", { delay: 200 });
sr.reveal(".button-cv", { delay: 200 });
sr.reveal(".home__img", { delay: 400 });
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".about__subtitle", { delay: 200 });
sr.reveal(".about__text", { delay: 200 });
sr.reveal(".skills__subtitle", {});
sr.reveal(".skills__text", { delay: 200 });
sr.reveal(".skills__data", { interval: 200 });
sr.reveal(".work__img", { interval: 100 });
sr.reveal(".contact__input", { interval: 100 });

const typedTextSpan = document.querySelector(".typing");
const txt = [
  "Front End Developer",
  "Back End Developer",
  "Full Stack JavaScript Developer",
];
const typeSpeed = 150;
const eraseSpeed = 100;
const newText = 500;
let textArrayIndex = 0;
let charIndex = 0;
function typeWriter() {
  if (charIndex < txt[textArrayIndex].length) {
    if (typedTextSpan) {
      typedTextSpan.textContent += txt[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    }
  } else {
    setTimeout(erase, newText);
  }
}
function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = txt[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= txt.length) {
      textArrayIndex = 0;
    }
    setTimeout(typeWriter, typeSpeed + 500);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(typeWriter, newText);
});

const messageForm = document.querySelector(".contact__form");
if (messageForm) {
  messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    sendMessage(name, email, message);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "İsmarıc uğurla göndərildi!",
      showConfirmButton: false,
      timer: 2500,
    }).then(() => window.location.reload());
  });
}
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    // top.window.onbeforeunload = null;
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
