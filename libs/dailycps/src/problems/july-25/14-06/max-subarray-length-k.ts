/**
 * This problem was asked by Google.

Given an array of integers and a number k, where 1 <= k <= length of the array,
compute the maximum values of each subarray of length k.

For example, given array = [10, 5, 2, 7, 8, 7] and k = 3, we should get: [10,
7, 8, 8], since:
*/

export function maxSubarrayLengthK(arr: number[], k: number): number[] {
  if (k > arr.length) {
    throw 'k is larger than arr.length';
  }
  const result: number[] = [];
  const maxStack: number[] = [];
  let currMax = Number.NEGATIVE_INFINITY;

  // Find max of first k nums
  let i = 0;
  for (; i < k; i++) {
    if (arr[i] > currMax) {
      currMax = arr[i];
    }
    maxStack.push(arr[i]);
  }
  result.push(currMax);

  for (; i < arr.length; i++) {
    maxStack.push(arr[i]);
    const kMax = toShifted(maxStack);

    result.push(kMax);
  }

  return result;
}

function toShifted(arr: number[]): number {
  let currmax = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
    if (arr[i] > currmax) {
      currmax = arr[i];
    }
  }

  arr.pop();

  return currmax;
}
