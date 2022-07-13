/**
 * Implement an autocomplete system.
 * That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
 */

export function autocomplete(
  dictionary: string[],
  searchTerm: string
): string[] {
  const wordCache = buildDictionary(dictionary);

  let suffixHits: WordTrie | undefined = wordCache.get(searchTerm.charAt(0));

  for (let i = 1; i < searchTerm.length; i++) {
    const char = searchTerm.charAt(i);
    // load next letter children to be searched
    suffixHits = suffixHits?.children.get(char);
    if (suffixHits) {
      continue;
    } else {
      return []; // Short circuit no dictionary match
    }
  }

  if (!suffixHits) return [];

  const result = buildString(suffixHits, searchTerm);

  return result;
}

function buildString(suffixHit: WordTrie, base: string): string[] {
  const results: string[] = [];
  // If there are no suffix branches, return the base
  if (suffixHit.isWord) {
    results.push(`${base}`);
  }
  const suffixCombinations = [...suffixHit.children.values()].flatMap((c) =>
    buildString(c, `${base}${c.letter}`)
  );

  return results.concat(suffixCombinations);
}

function buildDictionary(dictionary: string[]): Map<string, WordTrie> {
  // For each word in the dictionary, build a trie of each letter in each word
  // that graphs out every letter combination. At the end of each word, mark the node as a
  // complete word
  const dict = new Map<string, WordTrie>();

  dictionary.forEach((word) => {
    // Initialize current trie to first letter entry
    let currentMap = dict;

    for (let i = 0; i < word.length; i++) {
      const letter = word.charAt(i);
      const existing = currentMap.get(letter);
      // If the letter has been visited, only update its isWord
      if (existing) {
        existing.isWord = existing.isWord || i === word.length - 1;
        // set current map to next letters of current
        currentMap = existing.children;
        continue;
      }

      const newEntry = new WordTrie(letter, i === word.length - 1);
      currentMap.set(letter, newEntry);
      currentMap = newEntry.children;
    }
  });

  return dict;
}

class WordTrie {
  constructor(
    public letter: string,
    public isWord: boolean = false,
    public children: Map<string, WordTrie> = new Map()
  ) {}
}
