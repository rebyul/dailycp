import { findMaxProfit } from './findMaxProfit';

describe('Find max profit', () => {
  test('Simple case: [1,2] with 2 actions returns 1', () => {
    expect(findMaxProfit([1, 2], 2)).toEqual(1);
  });

  test('Delayed sale test', () => {
    expect(findMaxProfit([1, 0, 5], 2)).toEqual(5);
  });

  test('Delayed purchase test', () => {
    expect(findMaxProfit([3, 0, 10], 2)).toEqual(10);
  });

  test.each([
    [[5, 2, 4, 0, 1], 2, 3],
    [[], 0, 0],
    [[10, 22, 5, 75, 65, 80], 2, 87],
    [[12, 14, 17, 10, 14, 13, 12, 15], 3, 12],
    [[100, 30, 15, 10, 8, 25, 80], 3, 72],
    [[90, 80, 70, 60, 50], 1, 0],
  ])('findMaxProfit(%s, %s) returns %s', (stockPrices, actions, expected) => {
    expect(findMaxProfit(stockPrices, actions)).toEqual(expected);
  });
});
