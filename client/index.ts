import Screen from "jsremote-client";
import Hint from "./Hint";

const hintElement = document.querySelector(".hint") as HTMLElement;
const hint = new Hint(hintElement);
const modeSwitchElement = document.querySelector(".toggle-mode") as HTMLElement;
let currentMode = "";

const screen = new Screen(document.querySelector(".screen"))
  .on("modeChange", mode => {
    if (mode === "Touch") {
      modeSwitchElement.textContent = "Touch";
    } else if (mode === "Mouse") {
      modeSwitchElement.textContent = "Mouse";
    } else {
      modeSwitchElement.textContent = "Offline";
    }
    currentMode = mode;
  })
  .on("statusChange", status => {
    if (currentMode === "Touch") {
      if (status === "ScrollUp") {
        hint.setText("Scrolling up...");
      } else if (status === "ScrollDown") {
        hint.setText("Scrolling down...");
      } else if (status === "Move") {
        hint.setText("Moving...");
      } else if (status === "Idle") {
        hint.setText("Tap & Pan to control");
      }
    } else {
      if (status === "Control") {
        hint.setText("You're controlling now");
      } else if (status === "Idle") {
        hint.setText("Click to control");
      }
    }
  });

screen.connect();

modeSwitchElement.addEventListener("click", () => screen.toggleMode());