import { productArray } from './productarray';

describe('product array', () => {
  test.each([
    { array: [1, 2, 3, 4, 5], expected: [120, 60, 40, 30, 24] },
    { array: [3, 2, 1], expected: [2, 3, 6] },
  ])('.productArray($array)', ({ array, expected }) => {
    expect(productArray(array)).toEqual(expected);
  });
});
