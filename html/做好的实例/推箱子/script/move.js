import * as mapInfo from "./mapInfo.js";
import { showUI, container } from "./UI.js";

const boxes = container.querySelectorAll(".box");
/**
 * 角色移动
 * @param {*} direction
 * @returns
 */
export function roleMove(direction) {
  let block = getNextNBlockInfo(direction, 1).block;

  if (block === mapInfo.config.WALL) {
    return false;
  }
  if (block === mapInfo.config.BACKGROUND) {
    changePosition(
      direction,
      getRolePosition(),
      getNextNBlockInfo(direction, 1)
    );
    return true;
  }
  if (block === mapInfo.config.BOX) {
    pushBox(direction);
    return true;
    // if (boxOnCorrect(direction, 1)) {
    //   //   let box = getBlockDiv(blockInfo.row, blockInfo.col);
    //   getBlockDiv(blockInfo.row, blockInfo.col + 1).classList.add(
    //     "correct-box"
    //   );

    //   console.log(1);
    // } else {
    //   getBlockDiv(blockInfo.row, blockInfo.col).classList.remove("correct-box");
    // }
  }
}

/**
 * 得到方块的值
 * @param {*} row
 * @param {*} col
 * @returns
 */
export function getBlock(row, col) {
  return mapInfo.map[row - 1][col - 1];
}
/**
 * 得到第N个方块的信息
 * @param {*} direction
 * @param {*} number 得到第几个方块
 * @returns
 */
function getNextNBlockInfo(direction, number) {
  let row, col;
  if (direction === "left") {
    row = getRolePosition().row;
    col = getRolePosition().col - Number(number);
  }

  if (direction === "right") {
    row = getRolePosition().row;
    col = getRolePosition().col + Number(number);
  }
  if (direction === "up") {
    row = getRolePosition().row - Number(number);
    col = getRolePosition().col;
  }
  if (direction === "down") {
    row = getRolePosition().row + Number(number);
    col = getRolePosition().col;
  }
  return {
    row,
    col,
    block: getBlock(row, col),
  };
}
/**
 * 获取角色的坐标
 * @returns
 */
function getRolePosition() {
  for (let row = 0; row < mapInfo.rowNumber; row++) {
    for (let col = 0; col < mapInfo.colNumber; col++) {
      if (mapInfo.map[row][col] === mapInfo.config.PLAYER) {
        return {
          row: row + 1,
          col: col + 1,
        };
      }
    }
  }
}
/**
 * 换位
 * @param {*} direction
 */
function changePosition(direction, block1, block2) {
  let temp = mapInfo.map[block1.row - 1][block1.col - 1];
  mapInfo.map[block1.row - 1][block1.col - 1] =
    mapInfo.map[block2.row - 1][block2.col - 1];
  mapInfo.map[block2.row - 1][block2.col - 1] = temp;
}
/**
 * 推箱子
 * @param {*} direction
 */
function pushBox(direction) {
  if (getNextNBlockInfo(direction, 2).block === mapInfo.config.BACKGROUND) {
    changePosition(
      direction,
      getNextNBlockInfo(direction, 1),
      getNextNBlockInfo(direction, 2)
    );
    changePosition(
      direction,
      getRolePosition(),
      getNextNBlockInfo(direction, 1)
    );
  } else {
    return;
  }
}

// /**
//  * 箱子是否在正确位置上
//  * @param {*} box
//  * @returns
//  */
// export function BoxOnCorrectPosition(row, col) {
//   return isCorrect(row, col);
// }

// export function getBlockDiv(row, col) {
//   return container.children[`${(row - 1) * mapInfo.colNumber + col - 1}`];
// }

// export function boxOnCorrect(direction, n) {
//   return BoxOnCorrectPosition(
//     getNextNBlockInfo(direction, 1).row,
//     getNextNBlockInfo(direction, 1).col
//   );
// }
