import { minCoins, harderMinCoins, takeNotakeCoins } from "./minCoins";

describe("Min coins", () => {
	test("Input 0 returns 0", () => {
		expect(minCoins(0)).toEqual(0);
	});
	test.each([[16, 3]])("Given maxCoin(%d) returns %d)", (max, output) => {
		expect(minCoins(max)).toEqual(output);
	});
});

describe("Harder min coins", () => {
	test("No coins returns -1", () => {
		expect(harderMinCoins([], 5)).toEqual(-1);
	});

	test("Impossible combination returns -1", () => {
		expect(harderMinCoins([4, 5, 6], 3)).toEqual(-1);
	});

	test("Sum 0 returns 0", () => {
		expect(harderMinCoins([1, 2, 3], 0)).toEqual(0);
	});

	test.each([
		[[10], 40, 4],
		[[25, 10, 5], 30, 2],
		[[9, 6, 5, 1], 19, 3],
		[[186, 419, 83, 408], 6249, 20],
		[[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], 9999, -1],
	])(
		"Possible combination harderMinCoins(%s, %d) returns %d",
		(input, total, expected) => {
			expect(harderMinCoins(input, total)).toEqual(expected);
		},
	);

	test("meow", () => {
		expect(harderMinCoins([3, 6, 7, 8, 4, 1], 4)).toEqual(1);
	});
});

describe("Geekcode solution attempt", () => {
	test("No coins returns -1", () => {
		expect(takeNotakeCoins([], 5)).toEqual(-1);
	});

	test("Impossible combination returns -1", () => {
		expect(takeNotakeCoins([4, 5, 6], 3)).toEqual(-1);
	});

	test("Sum 0 returns 0", () => {
		expect(takeNotakeCoins([1, 2, 3], 0)).toEqual(0);
	});

	test.each([
		[[10], 40, 4],
		[[25, 10, 5], 30, 2],
		[[9, 6, 5, 1], 19, 3],
		[[186, 419, 83, 408], 6249, 20],
		[[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], 9999, -1],
	])(
		"Possible combination takeNotakeCoins(%s, %d) returns %d",
		(input, total, expected) => {
			expect(takeNotakeCoins(input, total)).toEqual(expected);
		},
	);

	test("meow", () => {
		expect(takeNotakeCoins([3, 6, 7, 8, 4, 1], 4)).toEqual(1);
	});
});
