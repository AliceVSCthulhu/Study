import supFunc from "./supFunc.js";
const { isNormalArray } = supFunc;

//插值查找数据集必须要是等差数列，这样计算的比例才有意义。若是非等差，则插值的效率不如预期。
// 目标值长度 ： 总长度 = 目标index ： (右侧index - 左侧index)
// ==>  目标index = 目标长度 * (右侧index - 左侧index) / 总长度

/**
 * 验证一个数组是否是等差，特殊：长度为1返回false
 * @param {*} arr 
 * @returns {Boolean} Boolean
 */
function isEqualDiffArr(arr) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  //长度为1，默认不可插值，故返回false
  if (arr.length < 2) {
    return false;
  }
  //长度大于1
  let left = 0,
    right = 1;
  const gap = arr[1] - arr[0];
  //do...while..循环逻辑有些臃肿啊
  do {
    left++;
    right++;
    if (right >= arr.length) break;
    const gap_ = arr[right] - arr[left];
    if (gap_ !== gap) {
      return false;
    }
  } while (right < arr.length - 1);
  return true;
}

/**
 * 
 * @param {Array} arr 等差数列数组
 * @param {Number} target 目标值
 * @returns 若找到返回其下标，未找到返回-1
 */
function insertSearch(arr, target) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  //数组不为等差数列
  if (!isEqualDiffArr(arr)) {
    return -1;
  }
  let left = 0,
    right = arr.length - 1;
  //公差为0
  if (arr[left] === arr[right]) {
    return arr[left] === target ? left : -1;
  }
  //等差、长度大于1且公差不为0
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    const mid =
      left +
      Math.floor(
        ((target - arr[left]) / (arr[right] - arr[left])) * (right - left),
      );
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}