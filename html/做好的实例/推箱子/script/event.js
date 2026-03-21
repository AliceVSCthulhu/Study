import { roleMove } from "./move.js";
import { isWin } from "./gameRule.js";
import { showUI } from "./UI.js";

window.addEventListener("keydown", play);
let isover = false;
/**
 *
 * @param {Event} e
 */
function play(e) {
  let move = false;

  if (isover) {
    return;
  }
  if (e.key === "ArrowUp") {
    move = roleMove("up");
  } else if (e.key === "ArrowDown") {
    move = roleMove("down");
  } else if (e.key === "ArrowLeft") {
    move = roleMove("left");
  } else if (e.key === "ArrowRight") {
    move = roleMove("right");
  }
  if (move) {
    showUI();
    // window.removeEventListener("keydown", play);
    if (isWin()) {
      console.log("胜利");
      isover = true;
    }
  }
}
