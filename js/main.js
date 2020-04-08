"use strict";
import "@babel/polyfill";
import { getJson } from "/modules/getJsonData";

window.addEventListener("DOMContentLoaded", init);

const HTML = {};
const date = new Date();
let jsonData = [];

function init() {
  console.log("init");
  HTML.container = document.querySelector(".home-wrapper");

  // document.querySelector("#scrollbar").style.setProperty("--position", position);
  // scrolling();
  // getRatio();
  preLoad();
  startObserver();
  darkMode();
  visAarstal();
  getData();
  hideDetail();
  document.querySelector(".menuknap").addEventListener("click", menuFunction);
}

async function getData() {
  jsonData = await getJson("staticdata.json");
  console.table(jsonData);
  setDecadeEvents();
}

function hideDetail() {
  console.log("hideDetail");
  document.querySelector("#detail").style.display = "none";
}

function setDecadeEvents() {
  document.querySelectorAll(".accessible").forEach((element) => {
    console.log(element);

    element.addEventListener("click", function () {
      displayTheme(element.id);
    });
  });
}

function displayTheme(buttonId) {
  document.querySelector("#detail").style.display = "flex";

  // The theme will close after a click on the .close-btn
  document.querySelector("#detail .close-btn").addEventListener("click", hideDetail);

  // And/or after a click on the theme:
  document.querySelector("#detail").addEventListener("click", hideDetail);

  document.querySelector("#detail .info p").textContent = jsonData[0].info;
  document.querySelector("#detail .info h2").textContent = jsonData[0].name;
  document.querySelector("#detail .info-img").src = jsonData[0].url;
}

function preLoad() {
  console.log("preLoad");
  const preloader = document.querySelector(".preloader");

  animate({
    duration: 200,
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: function (progress) {
      preloader.style.left = 100 * progress + "%";
    },
  });
}

function animate({ duration, draw, timing }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function darkMode() {
  const darkMode = document.querySelector(".dark-mode");

  darkMode.removeAttribute("hidden");

  darkMode.querySelector("input").addEventListener("change", (evt) => {
    if (evt.target.checked) {
      document.body.classList.add("dark");
      return;
    }

    document.body.classList.remove("dark");
  });
}

// function getRatio() {
//   HTML.container.addEventListener("scroll", scrolling);
// }

// function scrolling() {
//   console.log("scrolling");

//   const ratio = HTML.container.scrollTop / (HTML.container.scrollHeight - HTML.container.clientHeight);
//   console.log(ratio);

//   document.querySelector("#scrollinfo").style.setProperty("--scrollRatio", ratio);
// }

function startObserver() {
  // The Intersection Observer
  // Inspiration from MDN and the section "Beautiful Scrolling Experiences – Without Libraries"
  // Link: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  // Link: https://24ways.org/2019/beautiful-scrolling-experiences-without-libraries/

  const sections = document.querySelectorAll("section");

  let options = {
    rootMargin: "0px",
    threshold: 0.55,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const { target } = entry;

      if (entry.intersectionRatio >= 0.55) {
        target.classList.add("is-visible");
      } else {
        target.classList.remove("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  sections.forEach((section, index) => {
    observer.observe(section);
  });
}

// Menu
function menuFunction() {
  console.log("menuFunction");
  /* Ved klik tilføjes eller fjernes "responsive" class på topnav */
  console.log("menuFunction");
  let x = document.querySelector("#navigation");
  // let y = document.querySelector("#knap-top");

  x.classList.toggle("responsive");
  // y.classList.toggle("responsive");
}

//Copyright - year
function visAarstal() {
  console.log("visAarstal");
  document.querySelector("#aarstal").innerHTML = date.getFullYear() + " ";
}
