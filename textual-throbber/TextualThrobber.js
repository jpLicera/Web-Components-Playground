/**
 * `template` element used to populate the shadow DOM.
 */
const ELEMENT_TEMPLATE = document.createElement('template');
ELEMENT_TEMPLATE.innerHTML = `
  <div class="loading-wrapper loading-wrapper--hidden">
    <div class="spinner"></div>
    <p id="message"> </p>
    <slot id="slot"></slot> 
  </div>
  
  <style>
    :host {
      position: absolute;
    }

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
      pointer-events: auto;
    }
    
    .loading-wrapper--hidden {
      pointer-events: none;
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
/**
 * A full-screen throbber that features dynamic messages.
 */
export class TextualThrobber extends HTMLElement {
    /**
     * A unique identifier for the timer created by `setInterval`.
     * @see setInterval
     */
    timerId;
    /**
     * The amount of time for which each message is displayed.
     */
    intervalMs = 2000;
    /**
     * Array that hosts all the messages (`string`s) that can be displayed by this element.
     */
    messages = [];
    /**
     *
     * The index of the current message (from `messages`) being displayed.
     * @see messages
     */
    index = 0;
    /**
     * Property required to respond to attribute changes.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements MDN - Web Components}
     */
    static observedAttributes = ["loading"];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(ELEMENT_TEMPLATE.content.cloneNode(true));
        this.initializeEventListeners();
    }
    /**
     * Begin looping through the messages contained in `messages`.
     * Does not reset the `index`, to avoid displaying the same message if multiple loading cycles occur.
     * @see messages
     */
    initializeTimerId() {
        this.timerId = setInterval(() => this.updateCurrentMessage(), this.intervalMs);
    }
    /**
     * Updates the value of the `currentMessage` property, based on the content of the `messages` property.
     * @see messages
     */
    updateCurrentMessage(index) {
        //Update the `index`, resetting back to 0 if necessary.
        this.index = index ?? (this.index + 1) % (this.messages.length);
        this.shadowRoot.getElementById("message").textContent = this.messages[this.index];
    }
    /**
     * Appends every eventListener required by the functionalities offered by this element.
     */
    initializeEventListeners() {
        const slotElement = this.shadowRoot.getElementById("slot");
        slotElement.addEventListener("slotchange", () => this.updateMessagesFromSlot(slotElement));
    }
    /**
     * Updates the value of the `messages` property with the `value`s acquired from the `throbber-message` elements found within this element.
     * Additionally, updates the current message being displayed.
     * @see messages
     * @see ThrobberMessage
     */
    updateMessagesFromSlot(slotElement) {
        const messageElements = slotElement.assignedNodes();
        this.messages = messageElements.filter((e) => e.value && e.value.trim().length > 0).map((e) => e.value);
        this.updateCurrentMessage(0);
    }
    /**
     * Lifecycle method invoked when this element is disconnected from the DOM.
     * Performs cleanup tasks or updates element state, such as stopping ongoing processes.
     *
     * @return {void} Does not return any value.
     */
    disconnectedCallback() {
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
    attributeChangedCallback(name, oldValue, newValue) {
        this.toggleLoading(newValue === "true");
    }
    /**
     * Determines whether this element should be displayed or not.
     * @param loading used to indicate whether the element should be displayed or not.
     * If `true`, this element is displayed and looping of the messages is started.
     * If `false`, this element is hidden and the timer created for looping is `cleared`.
     * @see clearInterval
     * @see initializeTimerId
     */
    toggleLoading(loading) {
        if (loading) {
            this.shadowRoot.querySelector(".loading-wrapper").classList.remove("loading-wrapper--hidden");
            this.initializeTimerId();
        }
        else {
            this.shadowRoot.querySelector(".loading-wrapper").classList.add("loading-wrapper--hidden");
            clearInterval(this.timerId);
        }
    }
}
//# sourceMappingURL=TextualThrobber.js.map