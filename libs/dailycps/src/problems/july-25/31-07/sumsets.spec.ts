import { hasSumset } from './sumsets';

describe('has sumset', () => {
  test.each([
    [[15, 5, 20, 10, 35, 15, 10], true],
    [[15, 5, 20, 10, 35], false],
    [[], false],
    [[2, 2, 3, 5], false],
    [[1, 5, -2, 4], true],
    [[10, -5, 3, 2], true],
    [[1, 1, 1, 5], false],
    [[1, 2, 3, 4, 5, 6, 7], true],
  ])('given %s, returns %s', (multiset, expected) => {
    expect(hasSumset(multiset)).toEqual(expected);
  });
});
