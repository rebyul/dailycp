import { findMinimumDistance } from './miceProblems';

describe('Mice problem', () => {
  test.each([[[1, 4, 9, 15], [10, -5, 0, 16], 6]])(
    // test.each([[[1, 4, 1000], [10, -6, -1000], 1006]])(
    '.findMinimumDistance(%p, %p) returns %p',
    (mice, holes, distance) => {
      expect(findMinimumDistance(mice, holes)).toEqual(distance);
    }
  );
});
