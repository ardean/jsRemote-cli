import {
  Server as HttpServer
} from "http";
import path from "path";
import robot from "robotjs";
import express from "express";
import SocketIOServer from "socket.io";

const app = express();
app.use(express.static(path.join(__dirname, "../client")));

const httpSocket = new HttpServer(app);
const rootPath = "";

robot.setMouseDelay(0);
robot.setKeyboardDelay(0);
const mousePosition = robot.getMousePos();
const screenSize = robot.getScreenSize();

const io = SocketIOServer(httpSocket, {
  path: fixWindowsPath(path.join("/", rootPath, "/sockets"))
}).on("connection", (socket) => {
  console.log("client connected");

  socket.on("mouseMove", (movementX, movementY) => {
    updateMousePos(movementX, movementY);
  }).on("mouseDown", (button) => {
    robot.mouseToggle("down", button);
  }).on("mouseUp", (button) => {
    robot.mouseToggle("up", button);
  }).on("mouseWheel", (deltaY) => {
    robot.scrollMouse(2, deltaY > 0 ? "down": "up");
  }).on("keyDown", (key) => {
    try {
      robot.keyToggle(key, "down");
    } catch (err) {
      console.log(err);
    }
  }).on("keyUp", (key) => {
    try {
      robot.keyToggle(key, "up");
    } catch (err) {
      console.log(err);
    }
  });
});

function updateMousePos(movementX, movementY) {
  mousePosition.x += movementX;
  mousePosition.y += movementY;

  mousePosition.x = Math.max(mousePosition.x, 0);
  mousePosition.x = Math.min(mousePosition.x, screenSize.width);
  mousePosition.y = Math.max(mousePosition.y, 0);
  mousePosition.y = Math.min(mousePosition.y, screenSize.height);

  robot.moveMouse(mousePosition.x, mousePosition.y);
}

httpSocket.listen(4444, () => {
  console.log("server started");
});

function fixWindowsPath(url) {
  return url.replace(/\\/g, "/");
}
