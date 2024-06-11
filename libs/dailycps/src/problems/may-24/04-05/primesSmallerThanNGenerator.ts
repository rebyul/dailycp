import { findPrimesSmallerThan } from './primesSmallerThanN';

export function* generatePrimeSmallerThan(
  input: number
): Generator<number | undefined> {
  yield findPrimesSmallerThan(input).pop();
}

export function run() {
  let current = 2;
  const foundPrimes = new Set<number>();

  while (true) {
    const nextPrime = generatePrimeSmallerThan(current).next().value;
    if (!foundPrimes.has(nextPrime)) {
      foundPrimes.add(nextPrime);
      console.log(nextPrime);
    }

    current++;
  }
}
