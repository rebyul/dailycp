/**
 * This problem was asked by Jane Street.

Suppose you are given a table of currency exchange rates,
represented as a 2D array. Determine whether there is a possible arbitrage: that is,
whether there is some sequence of trades you can make,
starting with some amount A of any currency,
so that you can end up with some amount greater than A of that currency.

There are no transaction costs and you can trade fractional quantities.
 */
export function hasArbitrage(currencies: number[][]): boolean {
  // For each currency row, test if there's an arbitrage
  for (
    let currentCurrency = 0;
    currentCurrency < currencies.length;
    currentCurrency++
  ) {
    if (
      testExchange(
        currencies,
        currentCurrency + 1,
        currencies[currentCurrency][currentCurrency + 1], // assume starting rate is 1:1 for self exchange,
        currentCurrency
      )
    )
      return true;
  }
  return false;
}

function testExchange(
  currencies: number[][],
  currentCurrency: number,
  currentRate: number,
  originalCurrency: number
) {
  for (
    let targetCurrency = currentCurrency;
    targetCurrency < currencies.length;
    targetCurrency++
  ) {
    // For a given currency, try to convert to back to current currency
    const rateBackToCurrent = currencies[targetCurrency][originalCurrency];
    if (rateBackToCurrent * currentRate > 1) {
      return true;
    }
    testExchange(
      currencies,
      targetCurrency + 1,
      currentRate * currencies[currentCurrency][targetCurrency],
      originalCurrency
    );
  }
  return false;
}
