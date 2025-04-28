import { stockSpan } from './stock-span';

describe('stock span', () => {
  it('default implementation n^2', () => {
    expect(stockSpan(Array(100, 80, 60, 70, 60, 75, 85))).toEqual(
      expect.arrayContaining(Array(1, 1, 1, 2, 1, 4, 6))
    );
  });
});
