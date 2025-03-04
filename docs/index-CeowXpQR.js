(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function burgerMenu(element) {
  if (!element) return;
  const menu = document.getElementById("menu");
  const setClassList = () => {
    element.classList.toggle("active");
    menu.classList.toggle("active");
  };
  element.addEventListener("click", setClassList);
}
class BaseButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.textContent = this.textContent;
    this.textContent = "";
    const style = document.createElement("style");
    style.textContent = `
      button {
        padding: 8px clamp(30px, 5vw, ${this.getAttribute("maxPadding") || "100"}px);
        font-size: clamp(14px, 5vw, ${this.getAttribute("maxFontSize") || "36"}px);
        color: var(--color-yellow);
        background-color: ${this.getAttribute("color") || "var(--color-black)"};
        border:1px solid  var(--color-yellow);
        border-radius: 10px;
          white-space: nowrap;
        cursor: default;
        transition: all 0.4s ease;
        width: ${this.handleWidth(`${this.getAttribute("size") || "100"}%;`)}
        max-height: ${this.handleWidth(`${this.getAttribute("height") || "100"}%;`)}
        text-align: center;
            font-family:
      ALS Gorizont Variable,
      sans-serif;
      }

      button:hover {
        background-color: ${this.getAttribute("hover-bg") || "var(--color-yellow)"};
        color: ${this.getAttribute("hover-color") || "var(--color-black)"};
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
  handleWidth(size) {
    if (size === null) return size;
    if (size.includes("px")) return `${size}px`;
    return size;
  }
}
burgerMenu(document.getElementById("burgerIcon"));
customElements.define("base-button", BaseButton);
