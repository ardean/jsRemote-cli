class Loading {
  constructor() {
    this.$element = $(".loading");
  }

  hide() {
    this.$element.hide();
  }

  show() {
    this.$element.show();
  }
}

export default new Loading();