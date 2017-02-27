"use strict";

var _util = require("util");

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

var _os = require("os");

var _chalk = require("chalk");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version("0.5.0").option("-p, --port [port]", "sets server port", parseInt).parse(process.argv);

const server = new _server2.default({
  port: _commander2.default.port
});

server.on("clientConnect", socket => {
  let address = socket.request.connection.remoteAddress.replace(/^.*:/, '');
  if (address == 1) address = "127.0.0.1";

  (0, _util.log)((0, _chalk.cyan)("new client connected: " + address));
  socket.once("disconnect", () => (0, _util.log)((0, _chalk.magenta)("client disconnected: " + address)));
});

server.listen(() => {
  (0, _util.log)((0, _chalk.cyan)(`jsRemote is running`));
  getIPv4Addresses().forEach(address => {
    (0, _util.log)((0, _chalk.green)(`http://${ address }:${ server.port }/`));
  });
});

function getIPv4Addresses() {
  const interfaces = (0, _os.networkInterfaces)();
  const ipv4 = [];

  Object.keys(interfaces).forEach(dev => {
    interfaces[dev].forEach(details => {
      if (details.family === "IPv4") {
        ipv4.push(details.address);
      }
    });
  });

  return ipv4;
}