import robot from "robotjs";

robot.setKeyboardDelay(0);

export default class Keyboard {
  constructor() {
    this.pressedKeys = {};
  }

  down(key) {
    if (this.pressedKeys[key]) this.up(key);

    this.pressedKeys[key] = true;

    try {
      robot.keyToggle(key, "down");
    } catch (err) {
      console.error("error: key down ", key);
    }
  }

  up(key) {
    if (!this.pressedKeys[key]) return;

    this.pressedKeys[key] = false;

    try {
      robot.keyToggle(key, "up");
    } catch (err) {
      console.error("error: key up ", key);
    }
  }
}
