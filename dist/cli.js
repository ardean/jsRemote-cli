"use strict";

var _util = require("util");

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

var _package = require("../package");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).option("-p, --port [port]", "sets server port", parseInt).parse(process.argv);

const server = new _server2.default({
  port: _commander2.default.port
});

server.on("clientConnect", socket => {
  (0, _util.log)("new client connected: " + socket.request.connection.remoteAddress);
  socket.once("disconnect", () => (0, _util.log)("client disconnected: " + socket.request.connection.remoteAddress));
});

server.listen(() => {
  (0, _util.log)(`jsremote server is running on port ${ server.port }`);
});