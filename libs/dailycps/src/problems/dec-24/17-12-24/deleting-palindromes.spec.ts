import { isPalindrome, splitArrayEvenly } from './deleting-palindromes';

describe('Deleting palindromes', () => {
  test.concurrent.each([
    ['watterrfetawx', false],
    ['waterretaw', true],
    ['pop', true],
  ])('%s is a palindrome: %s', (word, result) => {
    expect(isPalindrome(word)).toEqual(result);
  });

  test('Split even length array evenly', () => {
    expect(splitArrayEvenly([1, 2, 3, 4])).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('Split odd length array evenly', () => {
    expect(splitArrayEvenly([1, 2, 3, 4, 5])).toEqual([
      [1, 2],
      [4, 5],
    ]);
  });
});
