const supFunc = {
  /**
   * 验证参数是否为数组,且不为稀松数组,且每项不含null或undefined
   * @param {} arr
   * @returns Boolean
   */
  isNormalArray(arr) {
    function isFullArray(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (!(i in arr)) return false;
      }
      return true;
    }
    return (
      // 遍历了三次数组，性能待优化
      Array.isArray(arr) &&
      isFullArray(arr) &&
      !arr.some((ele) => ele === undefined || ele === null) &&
      arr.every((ele) => !Number.isNaN(Number(ele.toString())))
    );
  },
  /**
   * 数组排序
   * @param {} arr
   * @param {Number} towards 1 (升序)||-1（降序）
   */
  mySort(arr, towards) {
    if (!this.isNormalArray(arr)) {
      throw new TypeError(
        "Invalid First param value.It must be a non-empty array with each item being a number",
      );
    }
    const towardsArr = [-1, 1];
    if (!towardsArr.includes(towards)) {
      throw new TypeError(
        "Invalid second param value.Please enter the correct value. 1 represents forward direction, while -1 represents reverse direction",
      );
    }
    // 此时双参状态必正确
    if (towards > 0) {
      arr.sort((a, b) => a - b);
    } else {
      arr.sort((a, b) => b - a);
    }
  },
};

const { isNormalArray, mySort } = supFunc;
//二分法使用生成器实现
function* BinarySearch(arr, target) {
  if (!isNormalArray(arr)) {
    throw new TypeError("Param1 must be an Array!");
  }
  mySort(arr, 1);
  let leftArrow = 0,
    rightArrow = arr.length - 1;
  while (leftArrow <= rightArrow) {
    const midArrow = Math.floor((leftArrow + rightArrow) / 2);
    const midNum = arr[midArrow];
    yield {
      leftArrow,
      rightArrow,
      midArrow,
      midNum,
      target,
    };
    if (target === midNum) {
      return { index: midArrow, midNum };
    } else if (target < midNum) {
      //目标值在左侧
      rightArrow = midArrow - 1;
    } else {
      //目标在右侧
      leftArrow = midArrow + 1;
    }
  }
  //没有找到
  return -1;
}

//使用正常迭代器实现
function BinarySearchNormal(arr, target) {
  if (!isNormalArray(arr)) {
    throw new TypeError("Param1 must be an Array!");
  }
  mySort(arr, 1);
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = arr[mid];

    if (target === midVal) {
      return { index: mid, midVal };
    } else if (target < midVal) {
      right = mid - 1; // 直接更新指针
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

//使用递归实现
function BinarySearchRecursion(
  arr,
  target,
  leftArrow = 0,
  rightArrow = arr.length - 1,
) {
  if (!isNormalArray(arr)) {
    throw new TypeError("Param1 must be an Array!");
  }
  mySort(arr, 1);
  const midArrow = Math.floor((leftArrow + rightArrow) / 2);
  const midVal = arr[midArrow];
  if (leftArrow > rightArrow) {
    return -1;
  }
  if (target === midVal) {
    return { index: midArrow, value: midVal };
  } else if (target < midVal) {
    return BinarySearchRecursion(arr, target, leftArrow, midArrow - 1);
  } else {
    return BinarySearchRecursion(arr, target, midArrow + 1, rightArrow);
  }
}
