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
"racecar"
"ecarace"
"recacer"
""

As another example, given the string "google", you should return "elgoogle".
 */

export function createMinimumPalindrome(input: string): string {
  const dp = [...Array(input.length)].map(() => {
    return [...Array(input.length)].map(() => -1);
  });
  const min = findMinimumInsertions(input, 0, input.length - 1, dp);
  console.log(
    '🚀 ~ file: minimumPalindrome.ts ~ line 26 ~ createMinimumPalindrome ~ dp',
    dp
  );

  return `${min}`;
}

function findMinimumInsertions(
  word: string,
  start: number,
  end: number,
  dp: number[][] = []
): number {
  if (dp[start][end] !== -1) {
    return dp[start][end];
  }
  // Base Cases
  if (start > end) {
    return Number.MAX_VALUE;
  }

  if (start === end) {
    dp[start][end] = 0;
    return 0;
  }

  if (start === end - 1) {
    dp[start][end] = word[start] == word[end] ? 0 : 1;
    return dp[start][end];
  }

  if (word[start] == word[end]) {
    dp[start][end] = findMinimumInsertions(word, start + 1, end - 1, dp);
  } else {
    dp[start][end] =
      Math.min(
        findMinimumInsertions(word, start, end - 1, dp),
        findMinimumInsertions(word, start + 1, end, dp)
      ) + 1;
  }

  return dp[start][end];
}

function isPalindrome(word: string): boolean {
  for (let i = 0; i <= word.length / 2; i++) {
    for (let j = i + 1; j <= word.length / 2; j++) {
      const front = word.slice(i, j),
        back = word.slice(j, j * 2);

      if (front === [...back].reverse().join('')) {
        return true;
      }
    }
  }
  return false;
}
