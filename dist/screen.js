"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _robotjs = require("robotjs");

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Screen {
  constructor() {
    this.refreshSize();
  }

  refreshSize() {
    const size = _robotjs2.default.getScreenSize();
    this.width = size.width;
    this.height = size.height;
  }
}
exports.default = Screen;