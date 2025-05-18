import { minCoins } from './minCoins';

describe('Min coins', () => {
  test('Input 0 returns 0', () => {
    expect(minCoins(0)).toEqual(0);
  });
  test.each([[16, 3]])('Given maxCoin(%d) returns %d)', (max, output) => {
    expect(minCoins(max)).toEqual(output);
  });
});
