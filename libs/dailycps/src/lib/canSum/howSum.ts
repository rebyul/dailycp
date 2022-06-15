// import { memoize } from 'lodash';

export function howSum(
  targetSum: number,
  numbers: number[],
  memo: { [key: number]: number[] | null } = {}
): number[] | null {
  if (targetSum in memo) {
    return memo[targetSum];
  }
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (const n of numbers) {
    const remainder = targetSum - n;
    const remainderResult = howSum(remainder, numbers, memo);

    if (remainderResult !== null) {
      memo[targetSum] = [...remainderResult, n];
      return memo[targetSum];
    }
  }

  memo[targetSum] = null;
  return null;
}
