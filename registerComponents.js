import { COMPONENTS } from "./data/Components";
/**
 * Registers all the web components defined in `COMPONENTS`
 * @see COMPONENTS
 */
export function registerComponents() {
    for (const component of COMPONENTS) {
        customElements.define(component.name, component.constructor);
    }
}
