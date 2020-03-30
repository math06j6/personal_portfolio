"use strict";

window.addEventListener("DOMContentLoaded", init);

const HTML = {};

function init() {
  console.log("init");
  HTML.container = document.querySelector(".the_container");
  // document.querySelector("#scrollbar").style.setProperty("--position", position);
  // scrolling();
  getRatio();
}

function getRatio() {
  HTML.container.addEventListener("scroll", scrolling);
}

function scrolling() {
  console.log("scrolling");

  const ratio = HTML.container.scrollTop / (HTML.container.scrollHeight - HTML.container.clientHeight);
  console.log(ratio);

  document.querySelector("#scrollinfo").style.setProperty("--scrollRatio", ratio);
}

function startObserver() {
  // The Intersection Observer
  // Inspiration from MDN and the article "Beautiful Scrolling Experiences – Without Libraries"
  // Link: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  // Link: https://24ways.org/2019/beautiful-scrolling-experiences-without-libraries/

  const articles = document.querySelectorAll("article");

  let options = {
    rootMargin: "0px",
    threshold: 0.75
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const { target } = entry;

      if (entry.intersectionRatio >= 0.75) {
        target.classList.add("is-visible");
      } else {
        target.classList.remove("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  articles.forEach((article, index) => {
    observer.observe(article);
  });
}
