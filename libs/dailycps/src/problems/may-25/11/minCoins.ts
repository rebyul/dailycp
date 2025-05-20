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

export function harderMinCoins(coins: number[], total: number): number {
  const cache = new Map();
  harderMinCoinsHelper(coins, total, 0, 0, cache);
  const result = cache.get(total);
  return Number.isInteger(result) ? result : -1;
}

function harderMinCoinsHelper(
  coins: number[],
  target: number,
  currentSum: number,
  depth: number,
  cache: Map<number, number>
) {
  if (!coins || currentSum > target) {
    updateCache(cache, currentSum, -1);
    return;
  }

  // Hit jackpot
  if (currentSum === target) {
    updateCache(cache, currentSum, depth);
    return;
  }

  // See if we've been to where we're going
  const existingCache = cache.get(currentSum);

  if (existingCache === -1) {
    return;
  }

  // If we've been there with a shorter or equal route. Stop here. We've done this
  if (existingCache && existingCache <= depth) {
    return;
  }

  // Our depth is lower than the existing cache.
  // Keep going as we're discovering new heights
  updateCache(cache, currentSum, depth);

  for (const coin of coins) {
    const nextSum = currentSum + coin;

    harderMinCoinsHelper(coins, target, nextSum, depth + 1, cache);
  }

  return;
}

function updateCache(
  cache: Map<number, number>,
  target: number,
  depth: number
): number {
  const currentTargetMin = cache.get(target)!;
  if (Number.isInteger(currentTargetMin) && currentTargetMin <= depth) {
    return currentTargetMin;
  }
  cache.set(target, depth);
  return depth;
}
