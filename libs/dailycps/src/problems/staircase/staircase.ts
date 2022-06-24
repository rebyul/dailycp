// There's a staircase with N steps, and you can climb 1 or 2 steps at a time.
// Given N, write a function that returns the number of unique ways you can climb the staircase.
// The order of the steps matters.

// For example, if N is 4, then there are 5 unique ways:

// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2
// What if, instead of being able to climb 1 or 2 steps at a time,
// you could climb any number from a set of positive integers X?
// For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
// Generalize your function to take in X.

export function noOfWays(noOfStairs: number, availableSteps: number[]) {
  return findStep(noOfStairs, availableSteps);
}

function findStep(n: number, availableSteps: number[]): number {
  if (n == 0) return 1;
  else if (n < 0) return 0;
  else
    return availableSteps
      .map((s) => findStep(n - s, availableSteps))
      .reduce((a, b) => a + b);
}
