import {
  enumerateMultiplesBelow,
  enumerateNumbers,
  findPrimesSmallerThan,
} from './primesSmallerThanN';

describe('Primes smaller than N', () => {
  test.each([
    [0, []],
    [1, [1]],
    [3, [1, 2, 3]],
  ])('.enumerateNumbers(%p) returns %p', (input, result) => {
    expect(enumerateNumbers(input)).toEqual(result);
  });

  test.each([
    [2, 4, [4]],
    [3, 9, [6, 9]],
    [5, 50, [10, 15, 20, 25, 30, 35, 40, 45, 50]],
  ])('.enumerateMultiplesBelow(%p, %p) return %p', (seed, max, result) => {
    expect(enumerateMultiplesBelow(seed, max)).toEqual(result);
  });

  test.each([
    [0, []],
    [1, []],
    [2, [2]],
    [3, [2, 3]],
    [10, [2, 3, 5, 7]],
  ])('.findPrimes(%p) returns %p', (input, result) => {
    expect(findPrimesSmallerThan(input)).toEqual(result);
  });
});
