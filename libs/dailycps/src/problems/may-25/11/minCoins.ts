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
	const cache = new Map<number | string, number>([
		["depth", 0],
		["cache", 0],
	]);
	if (coins.length === 0) {
		return -1;
	}

	if (total === 0) {
		return 0;
	}

	harderMinCoinsHelper(coins, total, 0, 0, cache);
	const result = cache.get(total);
	console.log(
		`harder ${coins}: ${cache.get("cache")}, cache hits: ${cache.get("depth")}`,
	);
	return Number.isInteger(result) ? result! : -1;
}

function harderMinCoinsHelper(
	coins: number[],
	target: number,
	currentSum: number,
	depth: number,
	cache: Map<number | string, number>,
): number {
	cache.set("depth", cache.get("depth")! + 1);
	// Gone out of bounds
	if (currentSum > target) {
		// cache.set(currentSum, -1);
		return -1;
	}

	// See if we've been to where we're going
	const existingCache = cache.get(currentSum);

	// If we've been there with a shorter or equal route. Stop here. We've done this
	if (existingCache && existingCache <= depth) {
		cache.set("cache", cache.get("cache")! + 1);
		return existingCache;
	}

	// Our depth is lower than the existing cache.
	// Keep going as we're discovering new heights
	// updateCache(cache, currentSum, depth);

	// Hit jackpot
	if (currentSum === target) {
		const test = Math.min(existingCache || Number.MAX_SAFE_INTEGER, depth);
		cache.set(currentSum, test);
		return test;
	}

	let min = depth;
	for (const coin of coins) {
		const res = harderMinCoinsHelper(
			coins,
			target,
			currentSum + coin,
			depth + 1,
			cache,
		);
		if (res !== -1) {
			if (res < depth) {
				updateCache(cache, currentSum, res);
				return res;
			}

			updateCache(cache, currentSum, depth);
		}
	}

	return min;
}

function updateCache(
	cache: Map<number | string, number>,
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
	const cache = new Map([
		["cache", 0],
		["depth", 0],
	]);
	if (coins.length === 0) {
		return -1;
	}
	if (total === 0) {
		return 0;
	}

	const res = takeNotakeHelper(coins, total, 0, cache);
	console.log(
		`take no take ${coins}: ${cache.get("cache")}, cache hits: ${cache.get("depth")}`,
	);
	return res !== Number.MAX_SAFE_INTEGER ? res : -1;
}

function takeNotakeHelper(
	coins: number[],
	currentSum: number,
	i: number,
	cache: Map<number | string, number>,
): number {
	cache.set("depth", cache.get("depth")! + 1);
	if (currentSum === 0) {
		return 0;
	}

	if (currentSum < 0 || i === coins.length) {
		return Number.MAX_SAFE_INTEGER;
	}

	// Cache hit
	if (cache.has(currentSum)) {
		cache.set("cache", cache.get("cache")! + 1);
		return cache.get(currentSum)!;
	}

	// Take coin path
	let take = Number.MAX_SAFE_INTEGER;
	if (coins[i]) {
		take = takeNotakeHelper(coins, currentSum - coins[i], i, cache);
		if (take !== Number.MAX_SAFE_INTEGER) {
			take++;
		}
	}

	// No take coin path
	// We dont take the coin at i, but rather i+1?
	const noTake = takeNotakeHelper(coins, currentSum, i + 1, cache);

	const minResult = Math.min(take, noTake);
	cache.set(currentSum, minResult);
	return Math.min(take, noTake);
}
