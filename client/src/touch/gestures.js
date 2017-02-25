import EventEmitter from "events";
import $ from "jquery";

export default class Gestures extends EventEmitter {
  pressTime = 250;
  movementThreshold = 9;

  constructor(element) {
    super();

    this.element = element;
    this.$element = $(element);
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);

    this.$element
      .on("pointerdown", this.pointerDown)
      .on("pointermove", this.pointerMove)
      .on("pointerup", this.pointerUp);
  }

  destroy() {
    this.$element
      .off("pointerdown", this.pointerDown)
      .off("pointermove", this.pointerMove)
      .off("pointerup", this.pointerUp);
    this.removeAllListeners();
  }

  pointerDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this.isPointerDown = true;
    this.pointerCount = (this.pointerCount || 0) + 1;
    if (!this.firstPointerId) {
      this.moreThanOne = false;
      this.firstPointerId = e.originalEvent.pointerId;
      this.firstPageX = this.pageX = e.originalEvent.pageX;
      this.firstPageY = this.pageY = e.originalEvent.pageY;
      this.downDate = new Date();
      this.lookForPress();
    } else {
      this.moreThanOne = true;
    }

    if (this.moreThanOne) {
      this.cancelPress();
    }
  }

  pointerMove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.isPointerDown) {
      if (!this.isUnderMovementThreshold(e.originalEvent.pageX, e.originalEvent.pageX)) {
        this.didMove = true;
      }

      if (this.didMove) {
        this.cancelPress();
      }

      if (!this.isFirstPointer(e)) return;

      if (this.pointerCount === 2) {
        const distance = this.pageY - e.originalEvent.pageY;
        if (distance !== 0) {
          this.scrollDirection = distance < 0 ? "down" : "up";
          this.isScrolling = true;
          this.emit("scroll", this.scrollDirection);
        } else {
          this.scrollDirection = null;
        }

        this.pageX = e.originalEvent.pageX;
        this.pageY = e.originalEvent.pageY;

        return;
      }

      if (this.didMove && !this.moreThanOne) {
        this.emit("move", {
          movementX: e.originalEvent.pageX - this.pageX,
          movementY: e.originalEvent.pageY - this.pageY
        });
      }

      this.pageX = e.originalEvent.pageX;
      this.pageY = e.originalEvent.pageY;
    }
  }

  pointerUp(e) {
    e.preventDefault();
    e.stopPropagation();

    this.cancelPress();
    this.pointerCount--;

    if (this.isFirstPointer(e)) {
      if (this.isScrolling) {
        this.emit("scrolled");
      } else if (!this.didMove && !this.moreThanOne && new Date() - this.downDate <= 300) {
        this.emit("tap");
      } else {
        this.emit("up");
      }

      this.resetState();
    }
  }

  isFirstPointer(e) {
    return e.originalEvent.pointerId === this.firstPointerId;
  }

  resetState() {
    this.isScrolling = false;
    this.scrollDirection = null;
    this.firstPointerId = null;
    this.isPointerDown = false;
    this.didMove = false;
    this.moreThanOne = false;
  }

  isUnderMovementThreshold(currentX, currentY) {
    return Math.abs(this.firstPageX - currentX) <= this.movementThreshold &&
      Math.abs(this.firstPageY - currentY) <= this.movementThreshold;
  }

  lookForPress() {
    this.pressTimeout = setTimeout(() => {
      this.emit("press");
    }, this.pressTime);
  }

  cancelPress() {
    clearTimeout(this.pressTimeout);
  }
}