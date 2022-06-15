import { memoize } from 'lodash';

export const canSum = memoize(inner, (s) => s);

function inner(sum: number, numbers: number[], path: number[] = []): boolean {
  if (sum === 0) {
    return true;
  }
  if (sum < 0) return false;
  for (const n of numbers) {
    if (canSum(sum - n, numbers, [...path, n]) === true) return true;
  }
  return false;
}
