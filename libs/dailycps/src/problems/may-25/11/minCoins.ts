/**
 *This problem was asked by Google.

Find the minimum number of coins required to make n cents.

You can use standard American denominations, that is, 1¢, 5¢, 10¢, and 25¢.

For example, given n = 16, return 3 since we can make it with a 10¢, a 5¢, and a 1¢.
 */
export function minCoins(total: number): number {
  let localTotal = total,
    coins = 0;

  while (localTotal > 0) {
    if (localTotal >= 25) {
      localTotal -= 25;
    } else if (localTotal >= 10) {
      localTotal -= 10;
    } else if (localTotal >= 5) {
      localTotal -= 5;
    } else {
      localTotal -= 1;
    }
    coins++;
  }

  return coins;
}
