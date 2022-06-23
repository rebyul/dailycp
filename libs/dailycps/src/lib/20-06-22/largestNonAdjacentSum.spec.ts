import {
  bruteForceLargestNonAdjacentSum,
  dpLargestNonAdjacentSum,
} from './largestNonAdjacentSum';

describe('Largest non adjacent sum', () => {
  test.each([
    [[2, 5, 6, 2, 5], 13],
    [[5, 1, 1, 5], 10],
    [[-1, -1, -1, 5], 5],
    [[-1, 1, -1, 5], 6],
  ])('.bruteForceLargestNonAdjacentSum(%p) returns %d', (input, output) => {
    expect(bruteForceLargestNonAdjacentSum(input)).toEqual(output);
  });

  test.each([
    [[2, 5, 6, 2, 5], 13],
    [[5, 1, 1, 5], 10],
    [[-1, -1, -1, 5], 5],
    [[-1, 1, -1, 5], 6],
  ])('.dpLargestNonAdjacentSum(%p) returns %d', (input, output) => {
    expect(dpLargestNonAdjacentSum(input)).toEqual(output);
  });
});
