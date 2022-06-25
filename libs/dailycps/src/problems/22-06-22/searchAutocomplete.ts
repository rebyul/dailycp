/**
 * Implement an autocomplete system.
 * That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
 */

export function autocomplete(dictionary: string[], search: string) {
  const wordCache = buildDictionary(dictionary);
  // console.log(wordCache);

  let searchCache = wordCache;
  for (let i = 0; i < search.length; i++) {
    const char = search.charAt(i);

    if (searchCache.has(char)) searchCache = searchCache.get(char)!;
    else {
      return [];
    }
  }

  if (searchCache) {
    console.log(searchCache);

    return buildString(searchCache).map((s) => `${search}${s}`);
  }
  return [];
}

function buildString(charMap: RecursiveCharMap): string[] {
  if (charMap.size === 0) {
    return [...charMap.keys()];
  }
  return [...charMap.entries()].map(([k, v]) => {
    return `${k}${buildString(v)}`;
  });
}

function buildDictionary(dictionary: string[]) {
  const cache: RecursiveCharMap = new Map<string, RecursiveCharMap>();
  dictionary.map((w) => {
    const chars = w.split('');
    let charCache = cache;
    chars.forEach((c) => {
      if (charCache.has(c)) {
        charCache = charCache.get(c)!;
      } else {
        const newMap = new Map();
        charCache.set(c, newMap);
        charCache = newMap;
      }
    });
  });
  return cache;
}

type RecursiveCharMap = Map<string, RecursiveCharMap>;
