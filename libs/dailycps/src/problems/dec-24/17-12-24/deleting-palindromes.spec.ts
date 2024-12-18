import { isPalindrome } from './deleting-palindromes';

describe('Deleting palindromes', () => {
  test.each([
    ['watterrfetawx', false],
    ['waterretaw', true],
    ['pop', true],
  ])('%s is a palindrome: %s', (word, result) => {
    expect(isPalindrome(word)).toEqual(result);
  });
});
