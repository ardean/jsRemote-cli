"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

var _package = require("../package");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).option("-p, --port [port]", "sets server port", parseInt).parse(process.argv);

const server = new _server2.default();
const port = _commander2.default.port;

server.listen(port, () => {
  console.log(`jsremote server is running on port ${ server.port }`);
});