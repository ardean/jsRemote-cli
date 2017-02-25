import $ from "jquery";

class Hint {
  constructor() {
    this.$element = $(".hint");
  }

  setText(message) {
    this.$element.removeClass("error");
    this.$element.text(message);
    this.$element.show();
  }

  setError(message) {
    this.$element.addClass("error");
    this.$element.text(message);
    console.error(message);
  }
}

export default new Hint();