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
	if (coins.length === 0) {
		return -1;
	}
	harderMinCoinsHelper(coins, total, 0, 0, cache);
	const result = cache.get(total);
	return Number.isInteger(result) ? result : -1;
}

function harderMinCoinsHelper(
	coins: number[],
	target: number,
	currentSum: number,
	depth: number,
	cache: Map<number, number>,
): number {
	if (currentSum > target) {
		updateCache(cache, currentSum, -1);
		return -1;
	}

	// See if we've been to where we're going
	const existingCache = cache.get(currentSum);

	// If we've been there with a shorter or equal route. Stop here. We've done this
	if (existingCache && (existingCache === -1 || existingCache <= depth)) {
		return -1;
	}

	// Our depth is lower than the existing cache.
	// Keep going as we're discovering new heights
	cache.set(currentSum, depth);

	// Hit jackpot
	if (currentSum === target) {
		return 0;
	}

	for (const coin of coins) {
		const res = harderMinCoinsHelper(
			coins,
			target,
			currentSum + coin,
			depth + 1,
			cache,
		);
	}

	// updateCache(cache, currentSum, depth);
	return depth;
}

function updateCache(
	cache: Map<number, number>,
	target: number,
	depth: number,
): number {
	const currentTargetMin = cache.get(target)!;
	if (Number.isInteger(currentTargetMin) && currentTargetMin <= depth) {
		return currentTargetMin;
	}
	cache.set(target, depth);
	return depth;
}

export function takeNotakeCoins(coins: number[], total: number): number {
	let cache = new Map();
	if (coins.length === 0) {
		return -1;
	}
	if (total === 0) {
		return 0;
	}

	const res = takeNotakeHelper(coins, total, 0, cache);
	return res !== Number.MAX_SAFE_INTEGER ? res : -1;
}

function takeNotakeHelper(
	coins: number[],
	currentSum: number,
	i: number,
	cache: Map<number, number>,
): number {
	if (currentSum === 0) {
		return 0;
	}

	if (currentSum < 0 || i === coins.length) {
		return Number.MAX_SAFE_INTEGER;
	}

	// for (let i = 0; i < coins.length; i++) {
	// Take coin path
	// if (coins[i]) {
	let take = takeNotakeHelper(coins, currentSum - coins[i], i, cache);
	if (take !== Number.MAX_SAFE_INTEGER) {
		take++;
	}
	// }
	// Update cache for take path
	// updateCache(cache, currentSum + coins[i], take)

	// No take coin path
	// We dont take the coin at i, but rather i+1?
	const noTake = takeNotakeHelper(coins, currentSum, i + 1, cache);

	return Math.min(take, noTake);
	// }
	// return 0;
}
