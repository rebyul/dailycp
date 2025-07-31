import { hasSumset } from './sumsets';

describe('has sumset', () => {
  test.each([
    [[15, 5, 20, 10, 35, 15, 10], true],
    [[15, 5, 20, 10, 35], false],
  ])('given %s, returns %s', (multiset, expected) => {
    expect(hasSumset(multiset)).toEqual(expected);
  });
});
