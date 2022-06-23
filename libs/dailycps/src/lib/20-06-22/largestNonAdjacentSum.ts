/**
 * Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
 * For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10,
 * since we pick 5 and 5.

Follow-up: Can you do this in O(N) time and constant space?
 */

// Brute force
// Time complexity O(n^3)
// Space complexity O(1)
export function bruteForceLargestNonAdjacentSum(input: number[]) {
  let highestSum = input[0];

  for (let i = 0; i < input.length; i++) {
    // n
    let currentHighestSum = input[i];

    for (let j = i + 2; j < input.length; j++) {
      // n
      const nextMax = Math.max(...input.slice(j)); // n

      const nextMaxIndex = input.indexOf(nextMax, j); // n
      currentHighestSum = currentHighestSum + nextMax;
      j = nextMaxIndex + 1;
    }

    if (currentHighestSum > highestSum) {
      highestSum = currentHighestSum;
    }
  }

  return highestSum;
}

// Time complexity O(n)
// Space complexity O(2n)
export function dpLargestNonAdjacentSum(input: number[]) {
  const cache = [...Array(input.length + 1)].map(() => Array(2));

  cache[0][0] = null;
  cache[0][1] = null;

  for (let i = 0; i < input.length; i++) {
    cache[i + 1][0] = Math.max(cache[i][0], cache[i][1]);
    cache[i + 1][1] = cache[i][0] + input[i];
  }

  return Math.max(cache[input.length][0], cache[input.length][1]);
}
