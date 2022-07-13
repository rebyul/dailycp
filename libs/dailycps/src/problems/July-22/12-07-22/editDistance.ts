/**
 * This problem was asked by Google.

The edit distance between two strings refers to the minimum number of character insertions,
deletions, and substitutions required to change one string to the other.
For example, the edit distance between “kitten” and “sitting” is three: substitute the “k” for “s”,
substitute the “e” for “i”, and append a “g”.

Given two strings, compute the edit distance between them.
 */

export function editDistance(wordA: string, wordB: string): number {
  let changes = 0;
  const [shorter, longer] = [wordA, wordB].sort((a, b) => a.length - b.length);

  for (let i = 0; i < shorter.length; i++) {
    if (longer.charAt(i) !== shorter.charAt(i)) {
      changes++;
    }
  }

  return changes + longer.length - shorter.length;
}
