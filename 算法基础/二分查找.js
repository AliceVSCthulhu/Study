//二分法使用生成器实现
function* BinarySearch(arr, target) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Param1 must be an Array!");
  }
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
  if (!Array.isArray(arr)) {
    throw new TypeError("Param1 must be an Array!");
  }
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
  if (!Array.isArray(arr)) {
    throw new TypeError("Param1 must be an Array!");
  }
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
