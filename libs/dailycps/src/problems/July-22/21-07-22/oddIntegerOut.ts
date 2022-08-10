/**
 * This problem was asked by Google.

Given an array of integers where every integer occurs three times except for one integer,
which only occurs once, find and return the non-duplicated integer.

For example, given [6, 1, 3, 3, 3, 6, 6], return 1. Given [13, 19, 13, 13], return 19.

Do this in O(N) time and O(1) space.
 */

export function findOddInteger(numbers: number[]): number {
  const counterMap = new Map<number, number>();

  // Runtime O(n)
  for (const i of numbers) {
    const existingEntry = counterMap.get(i);
    if (existingEntry) {
      // If we have already found 2 of the current number, remove it from the mmap
      if (existingEntry === 2) {
        counterMap.delete(i);
      } else {
        // else increase the integer count
        counterMap.set(i, existingEntry + 1);
      }
    }
    // If it is a new number, add it to the map
    else counterMap.set(i, 1);
  }

  // Return next iterator value as there will only be 1 answer
  return counterMap.keys().next().value;
}
