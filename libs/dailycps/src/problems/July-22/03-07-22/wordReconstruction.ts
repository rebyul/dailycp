/**
 * This problem was asked by Microsoft.

Given a dictionary of words and a string made up of those words (no spaces),
 return the original sentence in a list. If there is more than one possible reconstruction,
 return any of them. If there is no possible reconstruction, then return null.

For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox",
you should return ['the', 'quick', 'brown', 'fox'].

Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond",
 return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
 */

export function reconstructDictionary(
  dictionary: string[],
  sentence: string,
  memo: { [key: string]: string[] | null } = {}
): string[] | null {
  if (sentence in memo) {
    return memo[sentence];
  }
  if (sentence === '') return [];
  const combinationCache: string[] | null = null;

  for (const word of dictionary) {
    if (sentence.indexOf(word) === 0) {
      const suffixWays = reconstructDictionary(
        dictionary,
        sentence.slice(word.length),
        memo
      );
      if (suffixWays !== null) {
        return [word, ...suffixWays];
      }
    }
  }

  memo[sentence] = combinationCache;

  return memo[sentence];
}
