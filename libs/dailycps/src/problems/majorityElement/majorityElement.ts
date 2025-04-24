/**
  Given an array arr[]. Find the majority element in the array. If no majority element exists, return -1.

Note: A majority element in an array is an element that appears strictly more than arr.size()/2 times in the array.

Examples:

Input: arr[] = [1, 1, 2, 1, 3, 5, 1]
Output: 1
Explanation: Since, 1 is present more than 7/2 times, so it is the majority element.
Input: arr[] = [7]
Output: 7
Explanation: Since, 7 is single element and present more than 1/2 times, so it is the majority element.
Input: arr[] = [2, 13]
Output: -1
Explanation: Since, no element is present more than 2/2 times, so there is no majority element.
Constraints:
1 ≤ arr.size() ≤ 105
0 ≤ arr[i] ≤ 105
*/
export class MapSolution {
  majorityElement(arr: number[]) {
    const itemCountMap: Map<number, number> = new Map();
    const majorityCount = Math.floor(arr.length / 2);
    for (const item of arr) {
      const currentCount = itemCountMap.get(item) || 0;

      if (currentCount + 1 > majorityCount) return item;
      itemCountMap.set(item, currentCount + 1);
    }
    return -1;
  }
}

export class SortingSolution {
  majorityElement(arr: number[]) {
    const majorityThreshold = Math.floor(arr.length / 2);

    arr.sort((a, b) => a - b);
    let count = 1;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] === arr[i]) {
        count++;
        if (count > majorityThreshold) {
          return arr[i];
        }
      } else {
        count = 1;
      }
    }

    if (count > majorityThreshold) {
      return arr[arr.length - 1];
    }

    return -1;
  }
}

export class MooresVotingSolution {
  majorityElement(arr: number[]) {
    let candidate = -1;
    let count = 0;

    for (const item of arr) {
      if (count === 0) {
        candidate = item;
        count++;
      } else if (candidate === item) {
        count++;
      }
      // if current != candidate
      else {
        count--;
      }
    }

    // Traverse array to get actual candidate count
    let actualCount = 0;
    for (const item of arr) {
      if (item === candidate) {
        actualCount++;
      }
    }

    return actualCount > arr.length / 2 ? candidate : -1;
  }
}
