import supFunc from "./supFunc";
const { isNormalArray, mySort } = supFunc;
function search(arr, target) {
  if (!isNormalArray(arr)) {
    throw new TypeError(
      "The parameters must be a non-empty array consisting entirely of numbers",
    );
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}