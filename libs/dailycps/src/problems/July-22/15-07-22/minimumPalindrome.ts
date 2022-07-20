/**
 * This problem was asked by Quora.

Given a string, find the palindrome that can be made by inserting
the fewest number of characters as possible anywhere in the word.
If there is more than one palindrome of minimum length that can be made, r
eturn the lexicographically earliest one (the first one alphabetically).

For example, given the string "race", you should return "ecarace",
since we can add three letters to it (which is the smallest amount to make a palindrome).
There are seven other palindromes that can be made from "race" by adding three letters,
but "ecarace" comes first alphabetically.
  'ecrarce', 'ecarace',
      'eracare', 'ercacre',
      'reacaer', 'recacer',
      'racecar', 'raecear'

As another example, given the string "google", you should return "elgoogle".
 */

export function createMinimumPalindrome(input: string): string {
  const dp = [...Array(input.length)].map(() => {
    return [...Array(input.length)].map<string[]>(() => []);
  });
  const min = findMinimumInsertions(input, 0, input.length - 1, dp);

  return min.sort((a, b) => {
    if (a.length === b.length) {
      return a < b ? -1 : 1;
    }
    return a.length < b.length ? -1 : 1;
  })[0];
}

function findMinimumInsertions(
  word: string,
  start: number,
  end: number,
  dp: string[][][] = []
): string[] {
  // if (dp[start][end] !== -1) {
  //   return dp[start][end];
  // }
  // Base Cases
  if (start > end) {
    dp[start][end] = [];
    return dp[start][end];
  }

  if (start === end) {
    dp[start][end] = [`${word.charAt(start)}`];
    return dp[start][end];
  }

  if (start === end - 1) {
    dp[start][end] =
      word.charAt(start) === word.charAt(end)
        ? [`${word.charAt(start)}${word.charAt(end)}`]
        : [
            `${word.charAt(start)}${word.charAt(end)}${word.charAt(start)}`,
            `${word.charAt(end)}${word.charAt(start)}${word.charAt(end)}`,
          ];
    return dp[start][end];
  }

  if (word.charAt(start) === word.charAt(end)) {
    dp[start][end] = findMinimumInsertions(word, start + 1, end - 1, dp).map(
      (c) => `${word.charAt(start)}${c}${word.charAt(end)}`
    );
  } else {
    dp[start][end] = findMinimumInsertions(word, start, end - 1, dp)
      .map((c) => `${word.charAt(end)}${c}${word.charAt(end)}`)
      .concat(
        findMinimumInsertions(word, start + 1, end, dp).map(
          (c) => `${word.charAt(start)}${c}${word.charAt(start)}`
        )
      );
  }

  return dp[start][end];
}
