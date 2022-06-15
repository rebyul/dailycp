import { memoize } from 'lodash';

export function gridTraveler(m: number, n: number): number {
  return memoized(m, n);
}

const memoized = memoize(bruteForce, (r, c) =>
  r < c ? `${r},${c}` : `${c},${r}`
);
function bruteForce(row: number, column: number): number {
  if (row === 1 && column === 1) {
    return 1;
  }
  if (row === 0 || column === 0) {
    return 0;
  }
  return memoized(row - 1, column) + memoized(row, column - 1);
}
