"use strict";
import "@babel/polyfill";
import staticdata from "../static/staticdata.json";
// let urlParams = new URLSearchParams(window.location.searchParams);
// let id = urlParams.get("id");

window.addEventListener("DOMContentLoaded", init);

let jsonData = [];

console.log("koga");

function init() {
  console.log("init");

  // let id = window.location.pathname;

  // newLink = document.querySelector(`[href="#${id}"]`);
  // console.log(id);
  let pages = document.querySelector(".page");
  getData();
}

async function getData() {
  // jsonData = await getJson("staticdata.json");
  const jsonData = staticdata;
  console.table(jsonData);
  displayTheme();
}

function displayTheme() {
  document.querySelector("#case").style.display = "block";

  // The theme will close after a click on the .close-btn
  // document.querySelector("#case .close-btn").addEventListener("click", hideCase);

  // And/or after a click on the theme:
  // document.querySelector("#case").addEventListener("click", hideCase);

  // Info + Description of the selected project

  // const myURL;
  // console.log(myURL.pathname);
  // let id = myURL.pathname;

  let checkCase = document.querySelector("#case");
  const parsedUrl = new URL(window.location.href);
  console.log(parsedUrl.searchParams.get("id"));

  // Visual content from the selected project

  checkCase.setAttribute("data-client", "id");
  console.log(client);
  if (checkCase.hasAttribute("data-client", "koga")) {
    console.log("koga");
  }

  document.querySelector("#case").setAttribute("data-client", jsonData[0].id);
  document.querySelector("#case .case-study h2").textContent = jsonData[0].name;
  document.querySelector("[data-field=client]").textContent = jsonData[0].name;
  document.querySelector("#case .client-name").textContent = jsonData[0].name;
  document.querySelector("#case .case-study .description").textContent = jsonData[0].info;
  document.querySelector("#case .year").textContent = jsonData[0].year;
  document.querySelector("#case .role").textContent = jsonData[0].role;
  document.querySelector("#case .tech").textContent = jsonData[0].stack;
  document.querySelector(".case-study a.link").setAttribute("href", jsonData[0].link);

  // document.querySelector("#case .info-img").src = jsonData[0].url;
  // document.querySelector("#case .info-img-one").src = jsonData[0].content1;
}
