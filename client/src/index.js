import $ from "jquery";
import PointerLock from "jspointerlock";
import Connection from "./connection";
import hint from "./hint";
import keys from "./keymap";

const $element = $(".fullscreen");
const pointerLock = new PointerLock($element);
const connection = new Connection();
const socket = connection.socket;

connection
  .on("connect", () => {
    updateBindings();
    updateHint();
  })
  .on("disconnect", () => {
    pointerLock.exitPointerLock();
    updateBindings();
    updateHint();
  });

$element.on("click", () => {
  if (!pointerLock.isLocked && connection.isConnected) {
    pointerLock.requestPointerLock();
  }
});

pointerLock.on("change", (isOn) => {
  updateBindings();
  updateHint();
});

function updateHint() {
  if (connection.isConnected) {
    if (pointerLock.isLocked) {
      hint.setText("You're controlling now");
    } else {
      hint.setText("Click to control");
    }
  } else {
    hint.setError("Not connected to server!");
  }
}

function updateBindings() {
  if (pointerLock.isLocked) {
    bind();
  } else {
    unbind();
  }
}

function mouseMove(e) {
  if (!connection.isConnected) return;

  socket.emit("mouseMove", e.originalEvent.movementX, e.originalEvent.movementY);
}

function mouseDown(e) {
  if (!connection.isConnected) return;

  socket.emit("mouseDown", getMouseButton(e.which));
}

function mouseUp(e) {
  if (!connection.isConnected) return;

  socket.emit("mouseUp", getMouseButton(e.which));
}

function mouseScroll(e) {
  if (!connection.isConnected) return;

  if (e.originalEvent.deltaY === 0) return;
  socket.emit("mouseScroll", e.originalEvent.deltaY);
}

function keyboardDown(e) {
  e.preventDefault();
  if (!connection.isConnected) return;

  socket.emit("keyboardDown", getKeyboardKey(e));
}

function keyboardUp(e) {
  e.preventDefault();
  if (!connection.isConnected) return;

  socket.emit("keyboardUp", getKeyboardKey(e));
}

function bind() {
  $(document)
    .on("mousemove", mouseMove)
    .on("mousedown", mouseDown)
    .on("mouseup", mouseUp)
    .on("wheel", mouseScroll)
    .on("keydown", keyboardDown)
    .on("keyup", keyboardUp);
}

function unbind() {
  $(document)
    .off("mousemove", mouseMove)
    .off("mousedown", mouseDown)
    .off("mouseup", mouseUp)
    .off("wheel", mouseScroll)
    .off("keydown", keyboardDown)
    .off("keyup", keyboardUp);
}

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
  } else if (number === 2) {
    return "middle";
  } else {
    return "left";
  }
}
