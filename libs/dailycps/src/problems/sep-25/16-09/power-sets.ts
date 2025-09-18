/*
Good morning! Here's your coding interview problem for today.

This problem was asked by Google.

The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

You may also use a list or array to represent a set.
*/
export function createPowerSet(nums: number[]): number[][] {
  const result: number[][] = [[]];

  for (const num of nums) {
    const currentSize = result.length;

    for (let i = 0; i < currentSize; i++) {
      const newSet = [...result[i], num];
      result.push(newSet);
    }
  }

  return result;
}

export function recursivePowerSet(nums: number[]): number[][] {
  return ([[]] as number[][]).concat(recurse(nums, 0, []));
}

function recurse(nums: number[], start: number, current: number[]): number[][] {
  // const startingLen = current.length;
  const result = [];

  for (let n = start; n < nums.length; n++) {
    result.push([...current, nums[n]]); // [1], [2], [3]
  }

  // Temp array to avoid modifying result as we go
  let subs: number[][] = [];

  for (let i = 0; i < result.length; i++) {
    const sub = recurse(nums, start + 1 + i, result[i]);
    subs = subs.concat(sub);
  }

  return result.concat(subs);
}
