// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(template);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  // if clear is true we need to clear out the contents of the parent.

  parentElement.innerHTML = template;

  if(callback){
    callback(data);
  }
}

export async function loadTemplate(path){
  const file = await fetch(path);
  const result = await file.text();
  return result;
}

export async function loadHeaderFooter(){
  const headerContent= await loadTemplate('../partials/header.html');
  const footerContent= await loadTemplate('../partials/footer.html');

  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);
}

// Create alert messages
export function alertMessage(message, scroll = true) {
  // Create a div to hold the alert
  const alert = document.createElement("div");
  alert.classList.add("alert");

  const closeIcon = document.createElement("span");
  closeIcon.textContent = "X";

  // Add the message to the alert
  alert.innerHTML = `<p>${message}</p>`;
  alert.appendChild(closeIcon);

  // Add event listner to close button
  closeIcon.addEventListener("click", () => {
    main.removeChild(alert);
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  // Scroll to top if scroll is true
  if (scroll) {
    window.scrollTo(0,0);
  }
}

// Remove alert messages
export function removeAlertMessages() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {document.querySelector("main").removeChild(alert)});
}

// Generate Bread Crumbs for User
export function generateBreadCrumbs(pageList) {
  const breadCrumbs = pageList.join(" -> ");
  // Place the breadCrumbs in the div
  document.querySelector(".breadcrumbs").innerHTML = `<p>${breadCrumbs}</p>`;
}