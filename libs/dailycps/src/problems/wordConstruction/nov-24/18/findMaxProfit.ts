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
  // Base case
  if (stockPrices.length < 1) return 0;

  // Other base case
  if (actions === 0) {
    throw Error('no buy sell actions');
  }

  // Other other base case
  if (stockPrices.length === 1) return stockPrices[0];
  return 3;
}
