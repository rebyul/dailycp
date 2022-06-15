export function bestSum(
  target: number,
  numbers: number[],
  memo: { [key: number]: number[] | null } = {}
): number[] | null {
  if (target in memo) return memo[target];
  if (target === 0) return [];
  if (target < 0) return null;

  let shortestCombination: number[] | null = null;

  for (const n of numbers) {
    const adjoinedPath = bestSum(target - n, numbers, memo);

    if (adjoinedPath !== null) {
      const currentCombination = [n, ...adjoinedPath];

      if (shortestCombination === null) {
        shortestCombination = currentCombination;
      }
      if (shortestCombination.length > currentCombination.length) {
        shortestCombination = currentCombination;
      }
    }
  }

  memo[target] = shortestCombination;
  return shortestCombination;
}
