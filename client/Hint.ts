export default class Hint {
  constructor(
    private element: HTMLElement
  ) { }

  setText(message) {
    this.element.classList.remove("error");
    this.element.textContent = message;
    this.element.style.display = "block";
    console.info(message);
  }

  setError(message) {
    this.element.classList.add("error");
    this.element.textContent = message;
    console.error(message);
  }
}