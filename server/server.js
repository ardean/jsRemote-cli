import path from "path";
import express from "express";
import SocketIOServer from "socket.io";
import Screen from "./screen";
import Mouse from "./mouse";
import Keyboard from "./keyboard";

export default class Server {
  constructor() {
    this.screen = new Screen();
    this.mouse = new Mouse(this.screen);
    this.keyboard = new Keyboard();
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

    this.app = express();
    this.app.use(express.static(path.join(__dirname, "../client")));

    this.socket = this.app.listen(this.port, () => {
      callback();
    });

    this.io = SocketIOServer(this.socket, {
      path: fixWindowsPath(path.join("/", this.rootPath, "/sockets"))
    }).on("connection", (socket) => {
      console.log("client connected");

      socket
        .on("mouseMove", (movementX, movementY) => this.mouse.move(movementX, movementY))
        .on("mouseDown", (key) => this.mouse.down(key))
        .on("mouseUp", (key) => this.mouse.up(key))
        .on("mouseScroll", (deltaY) => this.mouse.scroll(deltaY))
        .on("keyboardDown", (key) => this.keyboard.down(key))
        .on("keyboardUp", (key) => this.keyboard.up(key));
    });

    return this.socket;
  }
}

function fixWindowsPath(url) {
  return url.replace(/\\/g, "/");
}
