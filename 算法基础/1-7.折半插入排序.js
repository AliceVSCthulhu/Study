import supFunc from "./supFunc.js";
const { isNormalArray } = supFunc;

function binaryInsertionSort(arr, forward = 1) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  const directions = [-1, 1];
  if (!directions.includes(forward)) {
    throw new RangeError("forward must be 1 or -1");
  }
  //双参无误
  for (let i = 1; i < arr.length; i++) {
    let curNum = arr[i];
    //init
    let left = 0,
      right = i - 1,
      mid = undefined;
    //找mid
    while (left <= right) {
      mid = Math.floor((right + left) / 2);
      // 处理排序(升序||降序)取值
      if (forward === 1 ? arr[mid] <= curNum : arr[mid] >= curNum) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    //找到边界left的值，移动arr下标大于left的元素
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    // 插值
    arr[left] = curNum;
  }
  return arr;
}