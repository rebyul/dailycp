/**
 * Given a string of round, curly, and square open and closing brackets,
 * return whether the brackets are balanced (well-formed).

For example, given the string "([])[]({})", you should return true.

Given the string "([)]" or "((()", you should return false.
 */

const openingBrackets = new Set(['(', '{', '[']);
const closingBracketPair: { [key: string]: string } = {
  ']': '[',
  ')': '(',
  '}': '{',
};

export function isWellFormed(input: string): boolean {
  const openBrackets = [];

  for (const char of input) {
    // is character opener
    if (openingBrackets.has(char)) {
      openBrackets.push(char);
      continue;
    }
    // if character is bracket closer
    else if (closingBracketPair[char]) {
      const lastOpenedBracket = openBrackets.pop();
      if (
        !lastOpenedBracket ||
        closingBracketPair[char] !== lastOpenedBracket
      ) {
        return false;
      }
    }
  }

  return openBrackets.length === 0;
}
