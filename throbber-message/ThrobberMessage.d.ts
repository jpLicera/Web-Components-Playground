/**
 * Element that contains the message to be displayed in a `textual-throbber` element.
 */
export declare class ThrobberMessage extends HTMLElement {
    constructor();
    /**
     * Lifecycle method that is called when this element is added to the document's DOM.
     * Appends a clone of the template to the shadow DOM.
     * @see ELEMENT_TEMPLATE
     */
    connectedCallback(): void;
    /**
     * Returns the text that defines this message.
     */
    get value(): string;
}
