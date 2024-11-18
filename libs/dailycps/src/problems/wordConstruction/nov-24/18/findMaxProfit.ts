/**
 * Good morning! Here's your coding interview problem for today.

This problem was asked by Facebook.

Given an array of numbers representing the stock prices of a company in
chronological order and an integer k, return the maximum profit you can make
from k buys and sells. You must buy the stock before you can sell it, and you
must sell the stock before you can buy it again.

For example, given k = 2 and the array [5, 2, 4, 0, 1], you should return 3.
 */

export function findMaxProfit(stockPrices: number[], actions: number): number {
  return maxProfitUtil(0, actions, true, stockPrices);
}

function maxProfitUtil(
  day: number,
  actions: number,
  isBuy: boolean,
  prices: number[]
) {
  if (actions <= 0 || prices.length <= day) {
    return 0;
  }

  let result = 0,
    profit = 0;

  // If we can buy
  if (isBuy) {
    // Buy at current price or skip
    profit = maxProfitUtil(day + 1, actions, !isBuy, prices) - prices[day];
    result = Math.max(profit, result);
  } else {
    // Sell at current price or skip
    profit = prices[day] + maxProfitUtil(day + 1, actions - 1, !isBuy, prices);
    result = Math.max(result, profit);
  }

  // Skip current price
  profit = maxProfitUtil(day + 1, actions, isBuy, prices);
  return Math.max(result, profit);
}
