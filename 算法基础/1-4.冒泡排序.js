import supFunc from "./supFunc.js";
const { isNormalArray } = supFunc;
/**
 * 冒泡排序
 * @param {*} arr
 * @param {*} forward 升序：forward = 1；降序：forward= -1
 * @returns new ordered arr
 */
function bubbleSort(arr, forward = 1) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  const directions = [-1, 1];
  if (!directions.includes(forward)) {
    throw new RangeError("forward must be 1 or -1");
  }
  let swapped;
  for (let i = 0; i < arr.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      let shouldSwap =
        forward === 1 ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
      if (shouldSwap) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return arr;
}