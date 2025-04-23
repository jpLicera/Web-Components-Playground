export class TextualThrobber extends HTMLElement {

  public connectedCallback() {
    console.log("Custom element added to page.");
  }

  public disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  public connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  public adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log(`Attribute ${name} has changed.`);
  }
}