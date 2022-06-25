/**
 * Implement an autocomplete system.
 * That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
 */

import { flatMap } from 'lodash';

export function autocomplete(dictionary: string[], search: string): string[] {
  const wordCache = buildDictionary(dictionary);

  let searchCache = wordCache;

  for (let i = 0; i < search.length; i++) {
    const char = search.charAt(i);

    if (searchCache.has(char)) {
      searchCache = searchCache.get(char)!;
      continue;
    } else {
      return []; // Short circuit no dictionary match
    }
  }

  return buildString(searchCache, search);
}

function buildString(charMap: RecursiveCharMap, base: string): string[] {
  // If there are no further character branches, return the base
  if (charMap.values().next().done) {
    return [base];
  }

  // for each char branch, append the recursed string
  return [...charMap.entries()].flatMap(([k, v]) => {
    return buildString(v, k).map((s) => `${base}${s}`);
  });
}

function buildDictionary(dictionary: string[]) {
  const cache: RecursiveCharMap = new Map<string, RecursiveCharMap>();
  dictionary.map((w) => {
    const chars = w.split('');
    let charCache = cache;

    // Foreach character in the word
    chars.forEach((c) => {
      // If it exists in the cache set it as the new base cache
      if (charCache.has(c)) {
        charCache = charCache.get(c)!;
        return;
      } else {
        // If it doesn't exist, create and set a new map with no branches
        const newMap = new Map();
        charCache.set(c, newMap);
        // Set the new character as the base cache
        charCache = newMap;
        return;
      }
    });
  });
  return cache;
}

type RecursiveCharMap = Map<string, RecursiveCharMap>;
