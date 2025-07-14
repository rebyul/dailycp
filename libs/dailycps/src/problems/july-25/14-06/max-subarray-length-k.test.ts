import { maxSubarrayLengthK } from './max-subarray-length-k';

describe('max subarray length k', () => {
  test.each([[[10, 5, 2, 7, 8, 7], 3, [10, 7, 8, 8]]])(
    'test',
    (input, k, expected) => {
      expect(maxSubarrayLengthK(input, k)).toEqual(expected);
    }
  );
});
