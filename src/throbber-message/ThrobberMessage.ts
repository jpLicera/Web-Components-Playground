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

/**
 * Element that contains the message to be displayed in a `textual-throbber` element.
 */
export class ThrobberMessage extends HTMLElement {

  public constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  /**
   * Lifecycle method that is called when this element is added to the document's DOM.
   * Appends a clone of the template to the shadow DOM.
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