import supFunc from "./supFunc.js";
const { isNormalArray } = supFunc;

/**
 *
 * @param {*} arr
 * @param {*} forward 升序：forward = 1；降序：forward= -1
 */
function selectionSort(arr, forward = 1) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  const directions = [-1, 1];
  if (!directions.includes(forward)) {
    throw new RangeError("forward must be 1 or -1");
  }
  // 双参正确
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const curDirect = forward === 1 ? arr[j] < arr[i] : arr[j] > arr[i];
      if (curDirect) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}