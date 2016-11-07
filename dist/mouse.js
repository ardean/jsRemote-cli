"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _robotjs = require("robotjs");

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_robotjs2.default.setMouseDelay(0);

class Mouse {
  constructor(screen) {
    this.screen = screen;
    this.pullPosition();
    this.pressedKeys = {};
  }

  pullPosition() {
    const position = _robotjs2.default.getMousePos();
    this.x = position.x;
    this.y = position.y;
  }

  down(key) {
    if (this.pressedKeys[key]) this.up(key);

    this.pressedKeys[key] = true;
    _robotjs2.default.mouseToggle("down", key);
  }

  up(key) {
    if (!this.pressedKeys[key]) return;

    this.pressedKeys[key] = false;
    _robotjs2.default.mouseToggle("up", key);
  }

  move(movementX, movementY) {
    this.x += movementX;
    this.y += movementY;

    this.x = Math.max(this.x, 0);
    this.x = Math.min(this.x, this.screen.width);
    this.y = Math.max(this.y, 0);
    this.y = Math.min(this.y, this.screen.height);

    _robotjs2.default.moveMouse(this.x, this.y);
  }

  scroll(deltaY) {
    _robotjs2.default.scrollMouse(2, deltaY > 0 ? "down" : "up");
  }
}
exports.default = Mouse;