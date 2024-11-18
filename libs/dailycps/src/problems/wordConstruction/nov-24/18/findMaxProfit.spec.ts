import { findMaxProfit } from './findMaxProfit';

describe('Find max profit', () => {
  test.each([[[5, 2, 4, 0, 1], 2, 3]])(
    'findMaxProfit(%s, %s) returns %s',
    (stockPrices, actions, expected) => {
      expect(findMaxProfit(stockPrices, actions)).toEqual(expected);
    }
  );
});
