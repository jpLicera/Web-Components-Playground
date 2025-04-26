# 💡 What is this?

I created this repository to learn the fundamentals of Web Components.

# 📖 Resources

## MDN Web Components Documentation:

* [Web Components Overview](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
* [Using Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
* [Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
* [Using Templates and Slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)

## Additional Resources:

* [Web Components on web.dev](https://web.dev/web-components/)
* [Custom Element Best Practices on web.dev](https://web.dev/articles/custom-elements-best-practices#attributes_and_properties)

# 🔍 Examples

This section features a list of examples of how each Web Component implemented in this repository can be used, and the result it produces.

## Textual throbber
This element consists of a full-screen throbber (loading icon) accompanied by a changing message.

The following snippet:

```html
<textual-throbber loading="true">
	<throbber-message>Summoning mystical unicorns...</throbber-message>
	<throbber-message>Brewing magical coffee...</throbber-message>
	<throbber-message>Teaching robots to dance...</throbber-message>
	<throbber-message>Convincing pixels to behave...</throbber-message>
	<throbber-message>Untangling virtual spaghetti...</throbber-message>
</textual-throbber>
```

Produces the following result:
