import { calculateTrappedRainWater } from './trappingRainWater';

describe('Trapping Rainwater', () => {
  test.each([
    [[2, 1, 2], 1],
    [[3, 0, 1, 3, 0, 5], 8],
  ])('.calculateTrappedRainWater(%p) returns %d', (walls, total) => {
    expect(calculateTrappedRainWater(walls)).toEqual(total);
  });
});
