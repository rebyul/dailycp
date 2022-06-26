/**
 * Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
 */

export function longestConsecutiveCombination(
  input: string,
  distinctChars: number
): string {
  let longestString = '';
  if (input.length === 0) return '';
  if (distinctChars === 0) return '';

  for (let i = 0; i < input.length; i++) {
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
