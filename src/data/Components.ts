import {CustomComponent} from "../interfaces/CustomComponent";
import {TextualThrobber} from "../textual-throbber/TextualThrobber";

/**
 * An array of all the `CustomComponents` defined in this package.
 * @see CustomComponent
 */
export const COMPONENTS: CustomComponent[] = [
  {
    name: "textual-throbber",
    constructor: TextualThrobber
  }
]