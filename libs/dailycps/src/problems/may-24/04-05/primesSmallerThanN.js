"use strict";
// Good morning! Here's your coding interview problem for today.
// This problem was asked by Square.
//
// The Sieve of Eratosthenes is an algorithm used to generate all prime numbers
// smaller than N. The method is to take increasingly larger prime numbers, and mark their multiples as composite.
//
// For example, to find all primes less than 100, we would first mark [4, 6, 8, ...]
// (multiples of two), then [6, 9, 12, ...] (multiples of three), and so on.
// Once we have done this for all primes less than N, the unmarked numbers that remain will be prime.
//
// Implement this algorithm.
//
// Bonus: Create a generator that produces primes indefinitely (that is, without taking N as an input).
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerateMultiplesBelow = exports.enumerateNumbers = exports.findPrimesSmallerThan = void 0;
function findPrimesSmallerThan(input) {
    if (input === 0 || input === 1)
        return [];
    var potentialPrimes = generatePotentialPrimes(input);
    // Only consider numbers smaller than i^2 as I DONT KNOW TODAY
    for (var i = 2; i * i <= input; i++) {
        if (potentialPrimes.has(i)) {
            // potentialPrimes.delete(i);
            for (var j = i * i; j <= input; j += i) {
                potentialPrimes.delete(j);
            }
        }
    }
    // Return all numbers in the original enumeration that isn't null (filter)
    return Array.from(potentialPrimes.values());
}
exports.findPrimesSmallerThan = findPrimesSmallerThan;
function generatePotentialPrimes(input) {
    if (input === 0)
        return new Set();
    if (input === 1)
        return new Set([1]);
    return new Set(Array.from({ length: input - 1 }, function (_, index) { return index + 2; }));
}
function enumerateNumbers(size) {
    return __spreadArray([], __read(Array(size)), false).map(function (_, i) { return i + 1; });
}
exports.enumerateNumbers = enumerateNumbers;
function enumerateMultiplesBelow(seed, max, memoizedMultiples) {
    if (memoizedMultiples === void 0) { memoizedMultiples = new Set(); }
    if (seed === 0 || seed === 1)
        throw Error("Can't generate multiples of 0 or 1");
    // Start with seed number
    // const multiples = [];
    var current = seed * 2;
    while (current <= max) {
        memoizedMultiples.add(current);
        current = current + seed;
    }
    return __spreadArray([], __read(memoizedMultiples.values()), false);
}
exports.enumerateMultiplesBelow = enumerateMultiplesBelow;
