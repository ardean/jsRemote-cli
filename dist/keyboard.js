"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _robotjs = require("robotjs");

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_robotjs2.default.setKeyboardDelay(0);

class Keyboard {
  constructor() {}

  down(key) {
    try {
      _robotjs2.default.keyToggle(key, "down");
    } catch (err) {
      console.error("error: key down ", key);
    }
  }

  up(key) {
    try {
      _robotjs2.default.keyToggle(key, "up");
    } catch (err) {
      console.error("error: key up ", key);
    }
  }
}
exports.default = Keyboard;