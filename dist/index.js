"use strict";

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

const app = (0, _express2.default)();
app.use(_express2.default.static(_path2.default.join(__dirname, "../client")));

const screen = new _screen2.default();
const mouse = new _mouse2.default(screen);
const keyboard = new _keyboard2.default();
const rootPath = "";

const httpSocket = app.listen(4444, () => {
  console.log("server started");
});

const io = (0, _socket2.default)(httpSocket, {
  path: fixWindowsPath(_path2.default.join("/", rootPath, "/sockets"))
}).on("connection", socket => {
  console.log("client connected");

  socket.on("mouseMove", (movementX, movementY) => mouse.move(movementX, movementY)).on("mouseDown", key => mouse.down(key)).on("mouseUp", key => mouse.up(key)).on("mouseScroll", deltaY => mouse.scroll(deltaY)).on("keyboardDown", key => keyboard.down(key)).on("keyboardUp", key => keyboard.up(key));
});

function fixWindowsPath(url) {
  return url.replace(/\\/g, "/");
}