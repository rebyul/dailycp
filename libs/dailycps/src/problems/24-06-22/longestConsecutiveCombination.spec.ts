import { longestConsecutiveCombination } from './longestConsecutiveCombination';

describe('Longest consecutive string combination', () => {
  test.each([
    ['a', 2, 'a'],
    ['a', 0, ''],
    ['aaa', 2, 'aaa'],
    ['abcba', 2, 'bcb'],
  ])(
    '.longestConsecutiveCombination(%s, %d) returns %s',
    (word, distinct, output) => {
      expect(longestConsecutiveCombination(word, distinct)).toEqual(output);
    }
  );
});
