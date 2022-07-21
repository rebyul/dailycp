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
  const wordTrie = buildTrie(dictionary);

  let currentTrie = wordTrie;
  for (let i = 0; i < searchTerm.length; i++) {
    if (!currentTrie) return [];

    // load next letter children to be searched
    currentTrie = currentTrie.children[searchTerm.charAt(i)];
  }

  const result = buildString(currentTrie, searchTerm);

  return result;
}

class Trie {
  constructor(
    public value: string | null,
    public isWord: boolean,
    public children: { [key: string]: Trie } = {}
  ) {}
}

function buildString(suffixHit: Trie, base: string): string[] {
  const results: string[] = [];
  if (suffixHit.isWord) {
    results.push(base);
  }

  const suffixCombinations = Object.values(suffixHit.children).flatMap((trie) =>
    buildString(trie, `${base}${trie.value}`)
  );

  return results.concat(suffixCombinations);
}

function buildTrie(dictionary: string[]): Trie {
  const root = new Trie(null, false);

  for (const word of dictionary) {
    let current = root;

    // At the end of each word, mark the node isWord = true if it's a complete word
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      const existingEntry = current.children[letter];
      // If the letter already exists, only update its isWord
      if (existingEntry) {
        if (i === word.length - 1) {
          existingEntry.isWord = true;
        }
        // set current map to next letters of current
        current = existingEntry;
      } else {
        current.children[letter] = new Trie(letter, i === word.length - 1);
        current = current.children[letter];
      }
    }
  }
  return root;
}
