import { hasArbitrage } from './arbitrage';

describe('Has arbitrage', () => {
  test.each([
    [
      [
        [1, 0.67, 0.78],
        [1 / 0.67, 1, 0.87],
        [1 / 0.78, 1 / 0.87, 1],
      ],
      false,
    ],
    [
      [
        [1, 0.67, 0.79],
        [1 / 0.67, 1, 0.87],
        [1 / 0.78, 1 / 0.7, 1],
      ],
      true,
    ],
    [
      [
        [1, 0.67, 0.79],
        [1 / 0.67, 1, 0.87],
        [1 / 0.78, 1 / 1.5, 1],
      ],
      false,
    ],
  ])('.hasArbitrage(%p) returns %p', (rates, output) => {
    expect(hasArbitrage(rates)).toEqual(output);
  });
});
