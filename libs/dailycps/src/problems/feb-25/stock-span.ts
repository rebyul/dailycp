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
      // If the previous day's price was higher than today's, end the span
      if (input[i] >= /** next */ input[j]) {
        streak++;
        stockSpan[i] = streak;
      }
      // Else continue the stream;
      else {
        stockSpan[i] = streak;
        break;
      }
    }
  }
  return stockSpan;
}

/**
 * stockSpanOptimized.
 *
 * @param {number[]} input
 */
export function stockSpanOptimized(input: number[]) {
  /** @type {number[]}*/
  const stockSpan: number[] = [];
  /**
   * @description Stack of previous stock price highs
   * @type { number[]}
   */
  const stack: number[] = [];

  for (let i = 0; i < input.length; i++) {
    // Keep popping while current price is greater than or equal to current price
    // We can discard the popped items as the previous highs are recorded by index
    while (stack.length > 0 && input[stack[stack.length - 1]] <= input[i]) {
      stack.pop();
    }

    // No previous stock prices are higher than current. therefore everything until index and including index is the span
    if (stack.length === 0) {
      stockSpan[i] = i + 1;
    }
    // streak is the current index minus the last index in the index stack where the price got stuck at
    else {
      stockSpan[i] = i - stack[stack.length - 1];
    }

    // Insert the current price to the stack
    stack.push(i);
  }
  return stockSpan;
}
