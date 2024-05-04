import {
  enumerateMultiplesBelow,
  enumerateNumbers,
  findPrimes,
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
    [3, 9, [6, 9]],
    [5, 50, [10, 15, 20, 25, 30, 35, 40, 45, 50]],
  ])('.enumerateMultiplesBelow(%p, %p) return %p', (seed, max, result) => {
    expect(enumerateMultiplesBelow(seed, max)).toEqual(result);
  });

  test.each([
    [0, []],
    [1, []],
    [2, []],
    [3, [3]],
  ])('.findPrimes(%p) returns %p', (input, result) => {
    expect(findPrimes(input)).toEqual(result);
  });
});
