/**
 * `template` element used to populate the shadow DOM.
 */
const ELEMENT_TEMPLATE: HTMLTemplateElement = document.createElement('template');

ELEMENT_TEMPLATE.innerHTML = `
  <slot></slot>
  <style>
  :host {
    display: none;
    visibility: hidden;
  }
  </style>
`;

export class ThrobberMessage extends HTMLElement {

  public constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  /**
   * Lifecycle method that is called when this element is added to the document's DOM.
   * Appends a clone of this template's template to the shadow DOM.
   * @see ELEMENT_TEMPLATE
   */
  public connectedCallback(): void {
    this.shadowRoot!.appendChild(ELEMENT_TEMPLATE.content.cloneNode(true));
  }

  /**
   * Returns the text that defines this message.
   */
  get value(): string {
    return this.textContent ?? "";
  }
}