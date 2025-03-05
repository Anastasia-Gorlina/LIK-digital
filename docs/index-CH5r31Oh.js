var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
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
class AccordionItem extends HTMLElement {
  constructor(header, content) {
    super();
    __publicField(this, "header");
    __publicField(this, "content");
    __publicField(this, "isOpen", false);
    this.attachShadow({ mode: "open" });
    this.render();
    this.header = header;
    this.content = content;
  }
  connectedCallback() {
    this.header = this.shadowRoot.querySelector(".accordion-header");
    this.content = this.shadowRoot.querySelector(".accordion-content");
    this.header.addEventListener("click", () => this.toggle());
    this.updateVisibility();
  }
  toggle() {
    this.isOpen = !this.isOpen;
    this.updateVisibility();
  }
  updateVisibility() {
    if (this.isOpen) {
      this.content.style.display = "block";
      this.header.setAttribute("aria-expanded", "true");
    } else {
      this.content.style.display = "none";
      this.header.setAttribute("aria-expanded", "false");
    }
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .accordion-header {
        color: #fe722b;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
        }
        .accordion-content {
        color: #004085;
          padding: 30px;
          display: none;
        }
      </style>
      <div class="accordion-header">
        <slot name="header">Default Header</slot>
      </div>
      <div class="accordion-content">
        <slot name="content">Default Content</slot>
      </div>
    `;
  }
}
function constructMail(formData) {
  const subject = "Запрос на дополнительную консультацию с лендинга ЛиК";
  const email = "kulturaPB@gazprom-neft.ru";
  const body = `
    ФИО: ${formData.fio.value}%0D%0A
    Организация: ${formData.company.value}%0D%0A
    Телефон: ${formData.phone.value}%0D%0A
    e-mail для ответа: ${formData.email.value}%0D%0A
    Ваше обращение: ${formData.freeField.value}%0D%0A
  `;
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailtoLink;
}
function onSendMail(element) {
  if (!element) return;
  element.addEventListener("click", () => {
    const companyInput = document.getElementById("company");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const freeFieldInput = document.getElementById("freeField");
    const fioInput = document.getElementById("fio");
    if (!companyInput || !emailInput || !phoneInput || !freeFieldInput || !fioInput) {
      console.error("Один или несколько элементов формы не найдены");
      return;
    }
    const formData = {
      company: companyInput,
      email: emailInput,
      phone: phoneInput,
      freeField: freeFieldInput,
      fio: fioInput
    };
    constructMail(formData);
    companyInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    freeFieldInput.value = "";
    fioInput.value = "";
  });
}
burgerMenu(document.getElementById("burgerIcon"));
customElements.define("base-button", BaseButton);
customElements.define("accordion-item", AccordionItem);
onSendMail(document.getElementById("sendMail"));
