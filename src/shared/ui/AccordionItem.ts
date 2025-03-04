export class AccordionItem extends HTMLElement {
  private header: HTMLElement;
  private content: HTMLElement;
  private isOpen: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.header = this.shadowRoot!.querySelector('.accordion-header') as HTMLElement;
    this.content = this.shadowRoot!.querySelector('.accordion-content') as HTMLElement;

    this.header.addEventListener('click', () => this.toggle());
    this.updateVisibility();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateVisibility();
  }

  updateVisibility() {
    if (this.isOpen) {
      this.content.style.display = 'block';
      this.header.setAttribute('aria-expanded', 'true');
    } else {
      this.content.style.display = 'none';
      this.header.setAttribute('aria-expanded', 'false');
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
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