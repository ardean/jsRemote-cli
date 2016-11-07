import path from "path";
import express from "express";
import SocketIOServer from "socket.io";
import Screen from "./screen";
import Mouse from "./mouse";
import Keyboard from "./keyboard";

const app = express();
app.use(express.static(path.join(__dirname, "../client")));

const screen = new Screen();
const mouse = new Mouse(screen);
const keyboard = new Keyboard();
const port = 4444;
const rootPath = "";

const httpSocket = app.listen(port, () => {
  console.log("server started on port ", port);
});

const io = SocketIOServer(httpSocket, {
  path: fixWindowsPath(path.join("/", rootPath, "/sockets"))
}).on("connection", (socket) => {
  console.log("client connected");

  socket
    .on("mouseMove", (movementX, movementY) => mouse.move(movementX, movementY))
    .on("mouseDown", (key) => mouse.down(key))
    .on("mouseUp", (key) => mouse.up(key))
    .on("mouseScroll", (deltaY) => mouse.scroll(deltaY))
    .on("keyboardDown", (key) => keyboard.down(key))
    .on("keyboardUp", (key) => keyboard.up(key));
});

function fixWindowsPath(url) {
  return url.replace(/\\/g, "/");
}
