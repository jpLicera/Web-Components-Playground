/**
 * `template` element used to populate the shadow DOM.
 */
const ELEMENT_TEMPLATE: HTMLTemplateElement = document.createElement('template');

ELEMENT_TEMPLATE.innerHTML = `
  <p class="message">
    <slot></slot>
  </p>
  
  <style>
    .message {
      text-align: center;
      padding: 20px;
    }

    .message--hidden {
      display: none;
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
}