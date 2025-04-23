/**
 * Models a that can be registered by calling `customElements.define`.
 * @see customElements#define
 */
export interface CustomComponent {
  readonly name: string;
  readonly constructor: CustomElementConstructor;
}