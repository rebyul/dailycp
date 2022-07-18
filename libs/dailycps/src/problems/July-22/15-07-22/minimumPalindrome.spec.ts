import { createMinimumPalindrome } from './minimumPalindrome';

describe('Minimum palindrome', () => {
  test.each([
    ['race', 'ecarace'],
    // ['google', 'elgoogle'],
  ])('.createMinimumPalindrome(%s) returns %s', (input, output) => {
    expect(createMinimumPalindrome(input)).toEqual(output);
  });
});
