import robot from "robotjs";

export default class Screen {
  constructor() {
    const size = robot.getScreenSize();
    this.width = size.width;
    this.height = size.height;
  }
}
