import { minCoins, harderMinCoins } from './minCoins';

describe('Min coins', () => {
  test('Input 0 returns 0', () => {
    expect(minCoins(0)).toEqual(0);
  });
  test.each([[16, 3]])('Given maxCoin(%d) returns %d)', (max, output) => {
    expect(minCoins(max)).toEqual(output);
  });
});

describe('Harder min coins', () => {
  test('No coins returns -1', () => {
    expect(harderMinCoins([], 5)).toEqual(-1);
  });

  test('Impossible combination returns -1', () => {
    expect(harderMinCoins([4, 5, 6], 3)).toEqual(-1);
  });

  test('Sum 0 returns 0', () => {
    expect(harderMinCoins([1, 2, 3], 0)).toEqual(0);
  });

  test.each([
    [[25, 10, 5], 30, 2],
    [[9, 6, 5, 1], 19, 3],
    [[9, 6, 5, 1], 19, 3],
    [[186, 419, 83, 408], 6249, 20],
  ])(
    'Possible combination harderMinCoins(%s, %d) returns %d',
    (input, total, expected) => {
      expect(harderMinCoins(input, total)).toEqual(expected);
    }
  );
});
