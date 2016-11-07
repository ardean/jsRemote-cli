import robot from "robotjs";

robot.setKeyboardDelay(0);

export default class Keyboard {
  constructor() {}

  down(key) {
    try {
      robot.keyToggle(key, "down");
    } catch (err) {
      console.error("error: key down ", key);
    }
  }

  up(key) {
    try {
      robot.keyToggle(key, "up");
    } catch (err) {
      console.error("error: key up ", key);
    }
  }
}
