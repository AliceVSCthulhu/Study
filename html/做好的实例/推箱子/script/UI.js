import * as mapInfo from "./mapInfo.js";

//一个小div的宽高
const width = 45,
  height = 45;

export const container = document.querySelector("#game");
export function showUI() {
  container.innerHTML = "";
  setOutter();
  createBlock();
}

function setOutter() {
  container.style.width = `${mapInfo.colNumber * width}px`;
  container.style.height = `${mapInfo.rowNumber * height}px`;
}

function createBlock() {
  for (let row = 0; row < mapInfo.rowNumber; row++) {
    for (let col = 0; col < mapInfo.colNumber; col++) {
      const div = document.createElement("div");
      div.className = "item";
      div.style.left = `${col * width}px`;
      div.style.top = `${row * height}px`;
      switch (mapInfo.map[row][col]) {
        case 0:
          break;
        case 1:
          div.classList.add("player");
          break;
        case 2:
          div.classList.add("box");
          if (isCorrect(row + 1, col + 1)) {
            div.classList.add("correct-box");
          }
          break;
        case 3:
          div.classList.add("wall");
          break;
        case 4:
          if (isCorrect(row + 1, col + 1)) {
            div.classList.add("correct");
          } else {
            div.style.backgroundColor = `rgb(128,128,128)`;
          }
          break;
      }
      container.appendChild(div);
    }
  }
}

function isCorrect(row, col) {
  return (
    mapInfo.correct.find((block) => {
      return block.row === row && block.col === col;
    }) !== undefined
  );
}
