import {CustomComponent} from "../interfaces/CustomComponent.ts";
import {TextualThrobber} from "../textual-throbber/TextualThrobber.ts";
import {ThrobberMessage} from "../throbber-message/ThrobberMessage.ts";

/**
 * An array of all the `CustomComponents` defined in this package.
 * @see CustomComponent
 */
export const COMPONENTS: CustomComponent[] = [
  {
    name: "textual-throbber",
    constructor: TextualThrobber
  },
  {
    name: "throbber-message",
    constructor: ThrobberMessage
  }
]