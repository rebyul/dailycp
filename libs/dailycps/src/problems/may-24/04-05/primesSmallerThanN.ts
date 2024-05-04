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
  // Enumerate all numbers from 2 to input
  const numbers = enumerateNumbers(input);
  // Filter 0 and 1 as they are non prime numbers by definition
  const filteredNumbers = filterZero(filterOne(numbers));
  // For each number from the first enumerated number, create a multiple array
  // that is less than `input`
  const multiples = filteredNumbers.map((v) =>
    enumerateMultiplesBelow(v, input)
  );
  // Mark each multiple as 0 as they are not prime numbers
  for (const multiple of multiples) {
    for (const value of multiple) {
      filteredNumbers[value] = 0;
    }
  }
  // Return all numbers in the original enumeration that isn't null (filter)
  return filteredNumbers.filter((v) => v === 0);
}

export function enumerateNumbers(size: number): number[] {
  return [...Array(size)].map((_, i) => i + 1);
}

function filterZero(numbers: number[]): number[] {
  return numbers.filter((n) => n !== 0);
}

function filterOne(numbers: number[]): number[] {
  return numbers.filter((n) => n !== 1);
}

export function enumerateMultiplesBelow(seed: number, max: number): number[] {
  if (seed === 0 || seed === 1)
    throw Error("Can't generate multiples of 0 or 1");

  let current = seed * 2;
  const multiples = [];
  while (current <= max) {
    multiples.push(current);
    current = current + seed;
  }

  return multiples;
}
