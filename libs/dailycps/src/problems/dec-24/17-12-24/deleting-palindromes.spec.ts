import { isPalindrome, splitArrayEvenly } from './deleting-palindromes';

describe('Deleting palindromes', () => {
  test.concurrent.each([
    ['watterrfetawx', false],
    ['waterretaw', true],
    ['pop', true],
  ])('%s is a palindrome: %s', (word, result) => {
    expect(isPalindrome(word)).toEqual(result);
  });

  test('Split even length number array evenly', () => {
    expect(splitArrayEvenly([1, 2, 3, 4])).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('Split odd length number array evenly', () => {
    expect(splitArrayEvenly([1, 2, 3, 4, 5])).toEqual([
      [1, 2],
      [4, 5],
    ]);
  });

  test('Split even length string array evenly', () => {
    expect(splitArrayEvenly('abcd')).toEqual(['ab', 'cd']);
  });

  test('Split odd length number string evenly', () => {
    expect(splitArrayEvenly('abcde')).toEqual(['ab', 'de']);
  });
});
