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

  preLoad();
  startObserver();
  darkMode();
  displayYear();
  getData();
  hideCase();
  document.querySelector(".menuknap").addEventListener("click", menuFunction);
}

async function getData() {
  jsonData = await getJson("staticdata.json");
  console.table(jsonData);
  setDecadeEvents();
}

function hideCase() {
  console.log("hideCase");
  document.querySelector("#case").style.display = "none";
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
  console.log(buttonId);
  document.querySelector("#case").style.display = "block";

  // The theme will close after a click on the .close-btn
  document.querySelector("#case .close-btn").addEventListener("click", hideCase);

  // And/or after a click on the theme:
  document.querySelector("#case").addEventListener("click", hideCase);

  // Info + Description of the selected project
  document.querySelector("#case").setAttribute("data-client", jsonData[0].id);
  document.querySelector("#case .case-study h2").textContent = jsonData[0].name;
  document.querySelector("[data-field=client]").textContent = jsonData[0].name;
  document.querySelector("#case .client-name").textContent = jsonData[0].name;
  document.querySelector("#case .case-study .description").textContent = jsonData[0].info;
  document.querySelector("#case .year").textContent = jsonData[0].year;
  document.querySelector("#case .role").textContent = jsonData[0].role;
  document.querySelector("#case .tech").textContent = jsonData[0].stack;
  document.querySelector(".case-study a.link").setAttribute("href", jsonData[0].link);

  // Visual content from the selected project
  let checkCase = document.querySelector("#case");
  if (checkCase.hasAttribute("data-client", "koga")) {
    console.log("koga");
  }

  document.querySelector("#case .info-img").src = jsonData[0].url;
  document.querySelector("#case .info-img-one").src = jsonData[0].content1;
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

//Copyright - this year
function displayYear() {
  console.log("displayYear");
  document.querySelector("time").innerHTML = date.getFullYear() + " ";
}
