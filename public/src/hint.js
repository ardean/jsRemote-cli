import $ from "jquery";

class Hint {
  constructor() {
    this.$element = $(".fullscreen > h1");
  }

  setText(message) {
    this.$element.removeClass("error");
    this.$element.text(message);
  }

  setError(message) {
    this.$element.addClass("error");
    this.$element.text(message);
    console.error(message);
  }
}

export default new Hint();
