import {COMPONENTS} from "./data/Components.ts";

/**
 * Registers all the web components defined in `COMPONENTS`
 * @see COMPONENTS
 */
export function registerComponents(): void {
  for (const component of COMPONENTS) {
    customElements.define(component.name, component.constructor);
  }
}