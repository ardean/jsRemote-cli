"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _screen = require("./screen");

var _screen2 = _interopRequireDefault(_screen);

var _mouse = require("./mouse");

var _mouse2 = _interopRequireDefault(_mouse);

var _keyboard = require("./keyboard");

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor() {
    this.screen = new _screen2.default();
    this.mouse = new _mouse2.default(this.screen);
    this.keyboard = new _keyboard2.default();
    this.port = 4444;
    this.rootPath = "";
  }

  listen(port, callback) {
    if (typeof port === "function") {
      callback = port;
      port = null;
    }

    port = port || this.port;
    callback = callback || function () {};

    this.app = (0, _express2.default)();
    this.app.use(_express2.default.static(_path2.default.join(__dirname, "../client")));

    this.socket = this.app.listen(this.port, () => {
      callback();
    });

    this.io = (0, _socket2.default)(this.socket, {
      path: fixWindowsPath(_path2.default.join("/", this.rootPath, "/sockets"))
    }).on("connection", socket => {
      console.log("client connected");

      socket.on("mouseMove", (movementX, movementY) => this.mouse.move(movementX, movementY)).on("mouseDown", key => this.mouse.down(key)).on("mouseUp", key => this.mouse.up(key)).on("mouseScroll", deltaY => this.mouse.scroll(deltaY)).on("keyboardDown", key => this.keyboard.down(key)).on("keyboardUp", key => this.keyboard.up(key));
    });

    return this.socket;
  }
}

exports.default = Server;
function fixWindowsPath(url) {
  return url.replace(/\\/g, "/");
}