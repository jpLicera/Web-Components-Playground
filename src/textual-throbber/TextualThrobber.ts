/**
 * `template` element used to populate the shadow DOM.
 */
const ELEMENT_TEMPLATE: HTMLTemplateElement = document.createElement('template');

ELEMENT_TEMPLATE.innerHTML = `
  <div class="loading-wrapper loading-wrapper--hidden">
    <div class="spinner"></div>
    <p id="message"> </p>
  </div>
  
  <style>
    .loading-wrapper {
      --accent-color: #00ffcc;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(5px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: monospace;
      background-color: rgba(0, 0, 0, 0.5);
      color: var(--accent-color);
      font-size: 1.2rem;
      opacity: 100%;
      transition: opacity 0.5s ease-in-out;
    }
    
    .loading-wrapper--hidden {
      opacity: 0;
    }
    
    .spinner {
      width: 48px;
      height: 48px;
      border: 6px solid #444;
      border-top: 6px solid var(--accent-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  
    .message {
      text-align: center;
      padding: 20px;
    }
  </style>
`;

export class TextualThrobber extends HTMLElement {
  private timerId: number | undefined;
  public intervalMs: number = 2000;
  /**
   * Array that hosts all the messages (`string`s) that can be displayed by this element.
   */
  public messages: string[] = ["Loading...", "Testing...", "Example..."];

  private currentMessage: string = this.messages[0];
  private index: number = 0;

  public static observedAttributes: string[] = ["loading"];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  private initializeTimerId(): void {
    this.timerId = setInterval(() => this.updateCurrentMessage(), this.intervalMs);
  }

  /**
   * Updated the value of the `currentMessage` property, based on the content of the `messages` property.
   * @see messages
   */
  private updateCurrentMessage(): void {
    //Update the `index`, resetting back to 0 if necessary.
    this.index = (this.index + 1) % (this.messages.length);
    this.currentMessage = this.messages[this.index];
    this.shadowRoot!.getElementById("message")!.textContent = this.currentMessage;
  }

  /**
   * Lifecycle method that is called when this element is added to the document's DOM.
   * Appends a clone of this template's template to the shadow DOM.
   * @see ELEMENT_TEMPLATE
   */
  public connectedCallback(): void {
    this.shadowRoot!.appendChild(ELEMENT_TEMPLATE.content.cloneNode(true));
    //Update the current message to overwrite the default empty value.
    this.updateCurrentMessage();
  }

  /**
   * Lifecycle method invoked when this element is disconnected from the DOM.
   * Performs cleanup tasks or updates element state, such as stopping ongoing processes.
   *
   * @return {void} Does not return any value.
   */
  public disconnectedCallback(): void {
    this.toggleLoading(false);
  }

  /**
   * Method invoked whenever one of the observed attributes changes.
   *
   * @param {string} name - The name of the attribute that was changed.
   * @param {string} oldValue - The previous value of the attribute before the change.
   * @param {string} newValue - The new value of the attribute after the change.
   *
   * @see observedAttributes
   */
  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    console.log(`Attribute ${name} has changed: ${oldValue} -> ${newValue}`);
    this.toggleLoading(newValue === "true");
  }

  public toggleLoading(loading: boolean): void {
    if (loading) {
      this.shadowRoot!.querySelector(".loading-wrapper")!.classList.remove("loading-wrapper--hidden");
      this.initializeTimerId();
    } else {
      this.shadowRoot!.querySelector(".loading-wrapper")!.classList.add("loading-wrapper--hidden");
      clearInterval(this.timerId);
    }
  }
}