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
	const res = harderMinCoinsHelper(coins, total, 0, cache);
	return res === Number.MAX_SAFE_INTEGER ? -1 : res;
	const result = cache.get(0);
	return Number.isInteger(result) ? result : -1;
}

function harderMinCoinsHelper(
	coins: number[],
	currentSum: number,
	depth: number,
	cache: Map<number, number>,
): number {
	if (currentSum < 0) {
		return -1; // Invalid result
	}

	if (currentSum === 0) {
		// updateCache(cache, 0, depth);
		return 0;
	}

	if (cache.has(currentSum)) {
		return cache.get(currentSum)!;
	}

	let localMin = Number.MAX_SAFE_INTEGER;
	for (const coin of coins) {
		const res = harderMinCoinsHelper(
			coins,
			currentSum - coin,
			depth + 1,
			cache,
		);

		if (res !== -1) {
			localMin = Math.min(res + 1, localMin);
		}
	}

	// cache.set(currentSum, localMin);
	updateCache(cache, currentSum, localMin);
	return localMin;
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

	if (cache.has(currentSum)) {
		return cache.get(currentSum)!;
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

	const localMin = Math.min(take, noTake);
	cache.set(currentSum, localMin);
	return localMin;
	// }
	// return 0;
}
