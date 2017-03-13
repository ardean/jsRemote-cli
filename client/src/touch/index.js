import $ from "jquery";
import hint from "../hint.js";
import connection from "../connection.js";
import loading from "../loading.js";
import Gestures from "./gestures.js";

const socket = connection.socket;

class PointerEvents {
  activate() {
    this.$element = $(".fullscreen");
    this.gestures = new Gestures(this.$element)
      .on("scroll", (scrollDirection) => {
        socket.emit("mouseScroll", 0.5, scrollDirection);
        hint.setText("Scrolling " + scrollDirection + "...");
      })
      .on("scrolled", () => {
        this.setDefaultHint();
      })
      .on("move", ({ movementX, movementY }) => {
        socket.emit("mouseMove", movementX, movementY);
        hint.setText("Moving...");
      })
      .on("up", () => {
        this.setDefaultHint();
      })
      .on("tap", () => {
        socket.emit("mouseDown", "left");
        socket.emit("mouseUp", "left");
        this.setDefaultHint();
      })
      .on("press", () => {
        socket.emit("mouseDown", "right");
        socket.emit("mouseUp", "right");
        this.setDefaultHint();
      });

    this.setDefaultHint();
    loading.hide();
  }

  deactivate() {
    this.$element && this.$element.removeClass("touch");
    this.gestures && this.gestures.destroy();

    hint.setText("");
  }

  setDefaultHint() {
    hint.setText("Tap & Pan to control");
  }
}

export default new PointerEvents();
