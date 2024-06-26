import { findMin, findMinimumDistance } from './miceProblems';

describe('Mice problem', () => {
  test.each([
    [[1, 4, 9, 15], [10, -5, 0, 16], 6],
    [[1, 7, 100], [-50909, 1, 2], 50910],
  ])(
    // test.each([[[1, 4, 1000], [10, -6, -1000], 1006]])(
    '.findMinimumDistance(%p, %p) returns %p',
    (mice, holes, distance) => {
      expect(findMinimumDistance(mice, holes)).toEqual(distance);
    }
  );

  test.each([
    [[1, 4, 9, 15], [10, -5, 0, 16], 6],
    [[1, 7, 100], [-50909, 1, 2], 50910],
  ])('.findMinimumDistance(%p, %p) returns %p', (mice, holes, distance) => {
    expect(findMin(mice, holes)).toEqual(distance);
  });
});
