/**
 * This problem was asked by Amazon.

There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time.
Given N, write a function that returns the number of unique ways you can climb the staircase.
The order of the steps matters.

For example, if N is 4, then there are 5 unique ways:

    1, 1, 1, 1
    2, 1, 1
    1, 2, 1
    1, 1, 2
    2, 2

What if, instead of being able to climb 1 or 2 steps at a time,
you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5},
 you could climb 1, 3, or 5 steps at a time.
 */

// Time complexity: O(n^m) where n = step count and m = possible steps
// Space complexity O(m)
export function recursiveStaircaseCombinations(
  stepCount: number,
  possibleSteps: number[]
): number[][] | null {
  if (stepCount === 0) return [[]];

  if (stepCount < 0) return null;

  const result: number[][] = [];

  for (const step of possibleSteps) {
    const next = recursiveStaircaseCombinations(
      stepCount - step,
      possibleSteps
    );

    if (next !== null) {
      result.push(...next.map((n) => [step, ...n]));
    }
  }

  return result;
}

// Time complexity: O(n*m^2) where n = step count and m = possible steps
// Space complexity: O(n*m^2)
export function dpStaircaseCombinations(
  stepCount: number,
  possibleSteps: number[]
) {
  // Cache the step combinations taken
  const cache: number[][][] = [...Array(stepCount + 1)].map(() => []);
  cache[0] = [[]];

  for (let i = 0; i < stepCount; i++) {
    for (const step of possibleSteps) {
      if (i + step <= stepCount) {
        cache[i + step] = cache[i + step].concat(
          cache[i].map((e) => [...e, step])
        );
        // console.log(cache);
      }
    }
  }

  return cache[stepCount];
}
