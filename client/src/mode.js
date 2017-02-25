import EventEmitter from "events";

class Mode extends EventEmitter {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.$element = $(".toggle-mode");
  }

  bind() {
    this.$element.on("click", this.toggle);
    this.detect();

    if (this.isTouch) {
      this.activateTouch();
    } else {
      this.activateMouse();
    }
  }

  detect() {
    this.isTouch = "ontouchstart" in document.documentElement;
  }

  toggle() {
    if (this.isTouch) {
      this.activateMouse();
    } else {
      this.activateTouch();
    }
  }

  activateTouch() {
    this.$element.text("Touch");
    this.isTouch = true;
    this.emit("change", this.isTouch);
  }

  activateMouse() {
    this.$element.text("Mouse");
    this.isTouch = false;
    this.emit("change", this.isTouch);
  }
}

export default new Mode();