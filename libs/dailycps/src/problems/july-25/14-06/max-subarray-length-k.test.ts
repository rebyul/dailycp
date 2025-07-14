import { maxSubarrayLengthK } from './max-subarray-length-k';

describe('max subarray length k', () => {
  test.each([
    [[10, 5, 2, 7, 8, 7], 3, [10, 7, 8, 8]],
    [[1, 2, 3, 4, 5, 6, 7, 8], 5, [5, 6, 7, 8]],
  ])('given input=%p and k=%d, returns %p', (input, k, expected) => {
    expect(maxSubarrayLengthK(input, k)).toEqual(expected);
  });
});
