import { findOddInteger } from './oddIntegerOut';

describe('Find odd integer out', () => {
  test.each([
    [[6, 1, 3, 3, 3, 6, 6], 1],
    [[13, 19, 13, 13], 19],
  ])('.findOddInteger(%p) returns %d', (numbers, answer) => {
    expect(findOddInteger(numbers)).toEqual(answer);
  });
});
