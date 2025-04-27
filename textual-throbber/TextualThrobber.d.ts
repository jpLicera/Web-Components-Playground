/**
 * A full-screen throbber that features dynamic messages.
 */
export declare class TextualThrobber extends HTMLElement {
    /**
     * A unique identifier for the timer created by `setInterval`.
     * @see setInterval
     */
    private timerId;
    /**
     * The amount of time for which each message is displayed.
     */
    intervalMs: number;
    /**
     * Array that hosts all the messages (`string`s) that can be displayed by this element.
     */
    private messages;
    /**
     *
     * The index of the current message (from `messages`) being displayed.
     * @see messages
     */
    private index;
    /**
     * Property required to respond to attribute changes.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements MDN - Web Components}
     */
    static observedAttributes: string[];
    constructor();
    /**
     * Begin looping through the messages contained in `messages`.
     * Does not reset the `index`, to avoid displaying the same message if multiple loading cycles occur.
     * @see messages
     */
    private initializeTimerId;
    /**
     * Updates the value of the `currentMessage` property, based on the content of the `messages` property.
     * @see messages
     */
    private updateCurrentMessage;
    /**
     * Appends every eventListener required by the functionalities offered by this element.
     */
    private initializeEventListeners;
    /**
     * Updates the value of the `messages` property with the `value`s acquired from the `throbber-message` elements found within this element.
     * Additionally, updates the current message being displayed.
     * @see messages
     * @see ThrobberMessage
     */
    private updateMessagesFromSlot;
    /**
     * Lifecycle method invoked when this element is disconnected from the DOM.
     * Performs cleanup tasks or updates element state, such as stopping ongoing processes.
     *
     * @return {void} Does not return any value.
     */
    disconnectedCallback(): void;
    /**
     * Method invoked whenever one of the observed attributes changes.
     *
     * @param {string} name - The name of the attribute that was changed.
     * @param {string} oldValue - The previous value of the attribute before the change.
     * @param {string} newValue - The new value of the attribute after the change.
     *
     * @see observedAttributes
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * Determines whether this element should be displayed or not.
     * @param loading used to indicate whether the element should be displayed or not.
     * If `true`, this element is displayed and looping of the messages is started.
     * If `false`, this element is hidden and the timer created for looping is `cleared`.
     * @see clearInterval
     * @see initializeTimerId
     */
    toggleLoading(loading: boolean): void;
}
