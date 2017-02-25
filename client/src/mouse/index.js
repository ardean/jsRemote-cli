import PointerLock from "jspointerlock";
import connection from "../connection.js";
import hint from "../hint.js";
import keys from "../keymap.js";
import loading from "../loading.js";

const socket = connection.socket;

class Desktop {
  constructor() {
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseScroll = this.mouseScroll.bind(this);
    this.keyboardDown = this.keyboardDown.bind(this);
    this.keyboardUp = this.keyboardUp.bind(this);
    this.connectionConnect = this.connectionConnect.bind(this);
    this.connectionDisconnect = this.connectionDisconnect.bind(this);
    this.pointerLockChange = this.pointerLockChange.bind(this);
    this.elementClick = this.elementClick.bind(this);
  }

  activate() {
    this.$element = $(".fullscreen");
    this.pointerLock = new PointerLock(this.$element);

    connection
      .on("connect", this.connectionConnect)
      .on("disconnect", this.connectionDisconnect);

    this.pointerLock.on("change", this.pointerLockChange);
    this.$element.on("click", this.elementClick);

    this.updateHint();
    loading.hide();
  }

  deactivate() {
    connection
      .removeListener("connect", this.connectionConnect)
      .removeListener("disconnect", this.connectionDisconnect);

    this.pointerLock && this.pointerLock.removeListener("change", this.pointerLockChange);
    this.$element && this.$element.off("click", this.elementClick);

    this.unbindLockedEvents();
    hint.setText("");
  }

  connectionConnect() {
    this.updateBindings();
    this.updateHint();
  }

  connectionDisconnect() {
    PointerLock.exitPointerLock();
    this.updateBindings();
    this.updateHint();
  }

  pointerLockChange(isOn) {
    this.updateBindings();
    this.updateHint();
  }

  elementClick() {
    if (!this.pointerLock.isLocked && connection.isConnected) {
      this.pointerLock.requestPointerLock();
    }
  }

  updateHint() {
    if (!connection.isConnected && connection.wasConnected) hint.setError("Not connected to server!");
    this.setDefaultHint();
  }

  setDefaultHint() {
    if (this.pointerLock.isLocked) {
      hint.setText("You're controlling now");
    } else {
      hint.setText("Click to control");
    }
  }

  updateBindings() {
    if (this.pointerLock.isLocked) {
      this.bindLockedEvents();
    } else {
      this.unbindLockedEvents();
    }
  }

  mouseMove(e) {
    if (!connection.isConnected) return;

    socket.emit("mouseMove", e.originalEvent.movementX, e.originalEvent.movementY);
  }

  mouseDown(e) {
    if (!connection.isConnected) return;

    socket.emit("mouseDown", this.getMouseButton(e.which));
  }

  mouseUp(e) {
    if (!connection.isConnected) return;

    socket.emit("mouseUp", this.getMouseButton(e.which));
  }

  mouseScroll(e) {
    if (!connection.isConnected) return;

    if (e.originalEvent.deltaY === 0) return;
    socket.emit("mouseScroll", e.originalEvent.deltaY);
  }

  keyboardDown(e) {
    e.preventDefault();
    if (!connection.isConnected) return;

    socket.emit("keyboardDown", getKeyboardKey(e));
  }

  keyboardUp(e) {
    e.preventDefault();
    if (!connection.isConnected) return;

    socket.emit("keyboardUp", getKeyboardKey(e));
  }

  bindLockedEvents() {
    $(document)
      .on("mousemove", this.mouseMove)
      .on("mousedown", this.mouseDown)
      .on("mouseup", this.mouseUp)
      .on("wheel", this.mouseScroll)
      .on("keydown", this.keyboardDown)
      .on("keyup", this.keyboardUp);
  }

  unbindLockedEvents() {
    $(document)
      .off("mousemove", this.mouseMove)
      .off("mousedown", this.mouseDown)
      .off("mouseup", this.mouseUp)
      .off("wheel", this.mouseScroll)
      .off("keydown", this.keyboardDown)
      .off("keyup", this.keyboardUp);
  }

  getKeyboardKey(e) {
    let key = keys[e.keyCode];
    if (!key) {
      key = e.key;
    }

    return key;
  }

  getMouseButton(number) {
    if (number === 3) {
      return "right";
    } else if (number === 2) {
      return "middle";
    } else {
      return "left";
    }
  }
}

export default new Desktop();