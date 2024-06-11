import { parentPort } from 'node:worker_threads';
import { findPrimesSmallerThan } from './primesSmallerThanN';

function batchGeneratePrimes(start: number, end: number): number[] {
  const primes: Set<number> = new Set();
  console.log('batch from ', start, end);
  // for (let i = start; i <= end; i++) {
  const foundPrimes = findPrimesSmallerThan(end);
  for (const p of foundPrimes) {
    primes.add(p);
    // }
  }
  console.log('found ', primes.size, 'primes for batch ', start, 'to ', end);
  return [...primes.values()];
}

parentPort?.on('message', ({ start, end }) => {
  const primes = batchGeneratePrimes(start, end);
  parentPort?.postMessage(primes);
});
