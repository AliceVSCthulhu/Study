import supFunc from "./supFunc.js";
const { isNormalArray } = supFunc;

function insertionSort(arr, forward = 1) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  const directions = [-1, 1];
  if (!directions.includes(forward)) {
    throw new RangeError("forward must be 1 or -1");
  }
  // 双参无误，开始排序
  for (let i = 1; i < arr.length; i++) {
    const currentNum = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      const shouldInsert =
        forward === 1 ? arr[j] < currentNum : arr[j] > currentNum;
      if (!shouldInsert) {
        // 需要与左侧每个排好的元素作比较
        arr[j + 1] = arr[j];
        if (
          // 左侧比较到最后一个元素时
          j === 0 && forward === 1 ? arr[j] > currentNum : arr[j] < currentNum
        ) {
          arr[j] = currentNum;
        }
      } else {
        // 直接右侧插入
        arr[j + 1] = currentNum;
        break;
      }
    }
  }
  return arr;
}