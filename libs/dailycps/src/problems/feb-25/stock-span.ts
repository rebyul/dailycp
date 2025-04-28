// The Stock Span Problem
// Last Updated : 24 Feb, 2025
// The stock span problem is a financial problem where we have a series of daily price quotes for a stock denoted by an array arr[] and the task is to calculate the span of the stock’s price for all days.
//
// The span of the stock’s price on ith day represents the maximum number of consecutive days leading up to ith day (including the current day) where the stock’s price was less than or equal to its price on day i.
//
// Examples:
//
// Input: arr[] = [100, 80, 60, 70, 60, 75, 85]
// Output: [1, 1, 1, 2, 1, 4, 6]
// Explanation: Traversing the given input span 100 is greater than equal to 100 and there are no more elements behind it so the span is 1, 80 is greater than equal to 80 and smaller than 100 so the span is 1, 60 is greater than equal to 60 and smaller than 80 so the span is 1, 70 is greater than equal to 60,70 and smaller than 80 so the span is 2 and so on.  Hence the output will be 1 1 1 2 1 4 6.
//
//
// Input: arr[] = [10, 4, 5, 90, 120, 80]
// Output: [1, 1, 2, 4, 5, 1]
// Explanation: Traversing the given input span 10 is greater than equal to 10 and there are no more elements behind it so the span is 1, 4 is greater than equal to 4 and smaller than 10 so the span is 1, 5 is greater than equal to 4,5 and smaller than 10 so the span is 2,  and so on. Hence the output will be 1 1 2 4 5 1.

/**
 * stockSpan.
 *
 * @param {number[]} input
 */
export function stockSpan(input: number[]) {
  const stockSpan = [];
  for (let i = input.length - 1; i >= 0; i--) {
    let streak = 1;
    stockSpan[i] = streak;

    // Traverse the span to the right to compare prices
    for (let j = i - 1; j >= 0; j--) {
      if (j < 0) {
        break;
      }
      // If the previous day's price was higher than today's, end the span
      if (input[i] < /** next */ input[j]) {
        stockSpan[i] = streak;
        break;
      }
      // Else continue the stream;
      streak++;
    }
  }
  return stockSpan;
}
