import $ from "jquery";
import mouse from "./mouse/index.js";
import touch from "./touch/index.js";
import mode from "./mode.js";

mode.on("change", () => {
  if (mode.isTouch) {
    mouse.deactivate();
    touch.activate();
  } else {
    touch.deactivate();
    mouse.activate();
  }
});

mode.bind();