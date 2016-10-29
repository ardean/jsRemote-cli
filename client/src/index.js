import $ from "jquery";
import io from "../sockets/socket.io.js";
import PointerLock from "jspointerlock";

const keys = {
  8: "backspace",
  9: "tab",
  13: "enter",
  16: "shift",
  17: "control",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  46: "delete",
  91: "command"
};

const element = document.body;
const $element = $(element);

const pointerLock = new PointerLock(element);
const socket = io(location.host, {
  path: location.pathname + "sockets"
});

let isConnected = false;
socket.on("connect", () => {
  isConnected = true;
  console.log("connect");
}).on("disconnect", () => {
  isConnected = false;
  console.log("disconnect");
});

function mouseMove(e) {
  if (!isConnected) return;

  socket.emit(
    "mouseMove",
    e.originalEvent.movementX,
    e.originalEvent.movementY
  );
}

function mouseDown(e) {
  if (!isConnected) return;

  socket.emit("mouseDown", getMouseButton(e.which));
}

function mouseUp(e) {
  if (!isConnected) return;

  socket.emit("mouseUp", getMouseButton(e.which));
}

function wheel(e) {
  if (!isConnected) return;

  if (e.originalEvent.deltaY === 0) return;
  socket.emit(
    "mouseWheel",
    e.originalEvent.deltaY
  );
}

function keyDown(e) {
  e.preventDefault();
  if (!isConnected) return;

  socket.emit(
    "keyDown",
    getKeyboardKey(e)
  );
}

function keyUp(e) {
  e.preventDefault();
  if (!isConnected) return;

  socket.emit(
    "keyUp",
    getKeyboardKey(e)
  );
}

function bind() {
  $element
    .on("mousemove", mouseMove)
    .on("mousedown", mouseDown)
    .on("mouseup", mouseUp)
    .on("wheel", wheel)
    .on("keydown", keyDown)
    .on("keyup", keyUp);
}

function unbind() {
  $element
    .off("mousemove", mouseMove)
    .off("mousedown", mouseDown)
    .off("mouseup", mouseUp)
    .off("wheel", wheel)
    .off("keydown", keyDown)
    .off("keyup", keyUp);
}

$element.on("click", (e) => {
  if (!pointerLock.isLocked) {
    pointerLock.requestPointerLock();
  }
});

pointerLock.on("change", (isOn) => {
  if (isOn) {
    bind();
  } else {
    unbind();
  }
});

function getKeyboardKey(e) {
  let key = keys[e.keyCode];
  if (!key) {
    key = e.key;
  }

  return key;
}

function getMouseButton(number) {
  if (number === 3) {
    return "right";
  } else if(number === 2) {
    return "middle";
  } else {
    return "left";
  }
}
