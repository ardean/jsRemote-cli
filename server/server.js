import { EventEmitter } from "events";
import path from "path";
import express from "express";
import createSocketIOServer from "socket.io";
import Screen from "./screen";
import Mouse from "./mouse";
import Keyboard from "./keyboard";

export default class Server extends EventEmitter {
  constructor(options) {
    super();

    options = options || {};

    this.screen = options.screen || new Screen();
    this.mouse = options.mouse || new Mouse(this.screen);
    this.keyboard = options.keyboard || new Keyboard();
    this.port = options.port || 4444;
    this.rootPath = options.rootPath || "";
    this.refreshInterval = options.refreshInterval || 10 * 1000;
    this.isStarted = false;
  }

  listen(port, callback) {
    if (this.isStarted) return;

    if (typeof port === "function") {
      callback = port;
      port = null;
    }

    port = this.port = port || this.port;
    callback = callback || function () {};

    this.app = express();
    this.app.disable("x-powered-by");
    this.app.use(express.static(path.join(__dirname, "../client")));

    this.socket = this.app.listen(port, () => {
      this.startRefreshInterval();
      this.isStarted = true;
      this.emit("start");
      callback();
    });

    this.io = createSocketIOServer(this.socket, {
      path: fixWindowsPath(path.join("/", this.rootPath, "/sockets"))
    }).on("connection", (socket) => {
      socket
        .on("mouseMove", (movementX, movementY) => this.mouse.move(movementX, movementY))
        .on("mouseDown", (key) => this.mouse.down(key))
        .on("mouseUp", (key) => this.mouse.up(key))
        .on("mouseScroll", (amount, direction) => this.mouse.scroll(amount, direction))
        .on("keyboardDown", (key) => this.keyboard.down(key))
        .on("keyboardUp", (key) => this.keyboard.up(key));

      this.emit("clientConnect", socket);
    });

    return this.socket;
  }

  startRefreshInterval() {
    setInterval(() => {
      this.screen.refreshSize();
      this.emit("refresh");
    }, this.refreshInterval);
  }
}

function fixWindowsPath(url) {
  return url.replace(/\\/g, "/");
}
