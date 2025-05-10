/**
 *Given an unsorted array of integers, find the length of the longest consecutive
 elements sequence.

For example, given [100, 4, 200, 1, 3, 2], the longest consecutive element
sequence is [1, 2, 3, 4]. Return its length: 4.

Your algorithm should run in O(n) complexity.
*/

export function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let max = 0;

  for (const num of nums) {
    if (set.has(num + 1)) continue;

    let counter = 1,
      current = num;

    while (set.has(--current)) counter++;

    max = Math.max(counter, max);
  }

  return max;
}
