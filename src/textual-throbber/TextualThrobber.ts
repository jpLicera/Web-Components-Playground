const template = document.createElement('template');
template.innerHTML = `
  <div class="loading-wrapper loading-wrapper--hidden">
    <div class="spinner"></div>
    <p id="message"></p>
  </div>
  
  <style>
    .loading-wrapper {
      --accent-color: #00ffcc;
      position: absolute;
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
      opacity: 1000%;
      transition: opacity 0.5s ease-in-out;
    }
    
    .loading-wrapper--hidden {
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

export class TextualThrobber extends HTMLElement {
  private timerId: number | undefined;
  public intervalMs: number = 2000;
  public messages: string[] = ["Loading...", "Testing...", "Example..."];
  private currentMessage: string = this.messages[0];
  private index: number = 0;

  public static observedAttributes: string[] = ["loading"];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  private initializeDynamicMessage(): void {
    this.timerId = setInterval(() => {
      //Update the `index`, resetting back to 0 if necessary.
      this.index = (this.index + 1) % (this.messages.length);
      this.currentMessage = this.messages[this.index];
      this.shadowRoot!.getElementById("message")!.textContent = this.currentMessage;
    }, this.intervalMs);
  }

  public connectedCallback(): void {
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  public disconnectedCallback(): void {
    this.toggleLoading(false);
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any): void {
    console.log(`Attribute ${name} has changed: ${oldValue} -> ${newValue}`);
    this.toggleLoading(newValue === "true");
  }

  public toggleLoading(loading: boolean): void {
    if (loading) {
      this.shadowRoot!.querySelector(".loading-wrapper")!.classList.remove("loading-wrapper--hidden");
      this.initializeDynamicMessage();
    } else {
      this.shadowRoot!.querySelector(".loading-wrapper")!.classList.add("loading-wrapper--hidden");
      clearInterval(this.timerId);
    }
  }
}