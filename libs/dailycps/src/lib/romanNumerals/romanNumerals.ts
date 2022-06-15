// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two ones added together.
// 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right.
// However, the numeral for four is not IIII. Instead, the number four is written as IV.
// Because the one is before the five we subtract it making four.
// The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9.
// X can be placed before L (50) and C (100) to make 40 and 90.
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer.

const descendingRomanCharacters = new Map<string, number>([
  ['M', 1000],
  ['D', 500],
  ['C', 100],
  ['L', 50],
  ['X', 10],
  ['V', 5],
  ['I', 1],
]);

export function romanToInt(s: string): number {
  let number = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    const nextChar = i + 1 < s.length ? s.charAt(i + 1) : undefined;

    // If next character exists and the current char is less than the next character
    if (nextChar) {
      const parsed = parseAhead(char, nextChar);
      if (parsed !== -1) {
        number += parsed;
        i++;
        continue;
      }
    }
    number += descendingRomanCharacters.get(char)!;
  }
  return number;
}

function parseAhead(c1: string, c2: string): number {
  if (descendingRomanCharacters.get(c1)! > descendingRomanCharacters.get(c2)!) {
    return -1;
  }
  if (iBeforeV(c1, c2)) {
    return 4;
  } else if (iBeforeX(c1, c2)) {
    return 9;
  } else if (xBeforeL(c1, c2)) {
    return 40;
  } else if (xBeforeC(c1, c2)) {
    return 90;
  } else if (cBeforeD(c1, c2)) {
    return 400;
  } else if (cBeforeM(c1, c2)) {
    return 900;
  }

  return -1;
}

function iBeforeV(c1: string, c2: string) {
  return c1 === 'I' && c2 === 'V';
}

function iBeforeX(c1: string, c2: string) {
  return c1 === 'I' && c2 === 'X';
}

function xBeforeL(c1: string, c2: string) {
  return c1 === 'X' && c2 === 'L';
}

function xBeforeC(c1: string, c2: string) {
  return c1 === 'X' && c2 === 'C';
}

function cBeforeD(c1: string, c2: string) {
  return c1 === 'C' && c2 === 'D';
}

function cBeforeM(c1: string, c2: string) {
  return c1 === 'C' && c2 === 'M';
}
