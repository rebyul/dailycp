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

export function findPrimes(input: number): number[] {
  if (input === 0 || input === 1) return [];

  const potentialPrimes = generatePotentialPrimes(input);
  // Only generate multiple factors that are less than half the input
  // Any higher multiples greater than half the input are too large, so ignore them.
  const maxInputFactor = Math.floor(input / 2);

  for (const value of potentialPrimes) {
    if (value <= maxInputFactor) {
      for (const m of enumerateMultiplesBelow(value, input)) {
        // Remove multiples from potential primes
        potentialPrimes.delete(m);
      }
    }
  }

  // Return all numbers in the original enumeration that isn't null (filter)
  return Array.from(potentialPrimes.values());
}

function generatePotentialPrimes(input: number): Set<number> {
  if (input === 0) return new Set();
  if (input === 1) return new Set([1]);
  return new Set(Array.from({ length: input - 1 }, (_, index) => index + 2));
}

export function enumerateNumbers(size: number): number[] {
  return [...Array(size)].map((_, i) => i + 1);
}

// function filterZero(numbers: number[]): number[] {
//   return numbers.filter((n) => n !== 0);
// }
//
// function filterOne(numbers: number[]): number[] {
//   return numbers.filter((n) => n !== 1);
// }

export function enumerateMultiplesBelow(seed: number, max: number): number[] {
  if (seed === 0 || seed === 1)
    throw Error("Can't generate multiples of 0 or 1");

  // Start with seed number
  const multiples = [];
  let current = seed * 2;

  while (current <= max) {
    multiples.push(current);
    current = current + seed;
  }

  return multiples;
}
