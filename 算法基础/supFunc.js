export default {
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
