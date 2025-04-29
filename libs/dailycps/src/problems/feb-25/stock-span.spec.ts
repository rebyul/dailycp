import { stockSpan } from './stock-span';

describe('stock span', () => {
  test.each([
    [
      [100, 80, 60, 70, 60, 75, 85],
      [1, 1, 1, 2, 1, 4, 6],
    ],
    [
      [10, 4, 5, 90, 120, 80],
      [1, 1, 2, 4, 5, 1],
    ],
  ])('default implementation n^2: given %s, returns %s', (input, output) => {
    expect(stockSpan(input)).toEqual(expect.arrayContaining(output));
  });
});
