/**
 * Given an integer k and a string s, find the length of the longest substring
 * that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct
characters is "bcb".
 */

export function recursiveLongestConsecutiveCombination(
  input: string,
  distinctChars: number
): string {
  let longestString = '';
  if (input.length === 0) return '';
  if (distinctChars === 0) return '';

  for (let i = 0; i < input.length; i++) {
    if (input.length - i < longestString.length) break;
    const char = input[i];
    const combination = `${char}${recurse(
      input.slice(i + 1),
      distinctChars,
      new Set(char)
    )}`;

    if (combination.length > longestString.length) {
      longestString = combination;
    }
  }
  return longestString;
}

function recurse(
  input: string,
  distinctChars: number,
  usedChars: Set<string>
): string {
  if (input.length === 0) return '';
  if (!usedChars.has(input[0]) && usedChars.size + 1 > distinctChars) return '';

  usedChars.add(input[0]);

  return `${input[0]}${recurse(input.slice(1), distinctChars, usedChars)}`;
}

// Time complexity: O(n^2) where n is the length of input
// Space complexity: O(n+m) where m is the value of distinct chars
export function iterativeLongestConsecutiveCombination(
  input: string,
  distinctChars: number
): string {
  let longestString = '';
  if (distinctChars === 0) return '';

  for (let index = 0; index < input.length; index++) {
    if (input.length - index < longestString.length) break;

    const char = input[index];
    const usedChars = new Set(char);
    const rest = input.slice(index + 1);

    let currentLongest = char;
    for (const c of rest) {
      if (!usedChars.has(c) && usedChars.size + 1 > distinctChars) break;

      usedChars.add(c);
      currentLongest = `${currentLongest}${c}`;
    }

    if (currentLongest.length > longestString.length) {
      longestString = currentLongest;
    }
  }
  return longestString;
}
