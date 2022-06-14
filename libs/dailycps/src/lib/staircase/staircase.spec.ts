import { noOfWays } from './staircase';

describe('Recursive staircase', () => {
  test.each([
    [4, [1, 2], 5],
    [5, [1, 2], 8],
    [4, [1, 3, 4], 4],
  ])('.noOfWays(%d)', (stairs, params, expected) => {
    expect(noOfWays(stairs, params)).toEqual(expected);
  });
});
