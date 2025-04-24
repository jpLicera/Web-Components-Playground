const template = document.createElement('template');
template.innerHTML = `
  <style>
    .dot { animation: blink 1s infinite; }
    @keyframes blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
  </style>
  <p class="dot">I blink</p>
  <div class="wrapper">
    <slot></slot> 
  </div>
`;

export class TextualThrobber extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  public connectedCallback() {
    console.log("Custom element added to page");
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  public disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  public connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  public adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log(`Attribute ${name} has changed.`);
  }
}