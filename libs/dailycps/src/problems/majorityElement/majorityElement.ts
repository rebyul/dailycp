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
