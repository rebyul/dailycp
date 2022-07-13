import { range } from 'lodash';

/**
 * This problem was asked by Amazon.

Run-length encoding is a fast and simple method of encoding strings.
The basic idea is to represent repeated successive characters as a single count and character.
For example, the string "AAAABBBCCDAA" would be encoded as "4A3B2C1D2A".

Implement run-length encoding and decoding.
You can assume the string to be encoded have no digits and consists solely of alphabetic characters.
You can assume the string to be decoded is valid.
 */
export function runLengthEncode(input: string): string {
  let result = '',
    currentLetter = '',
    currentCount = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char !== currentLetter) {
      if (currentCount > 0) {
        result += `${currentCount}${currentLetter}`;
      }
      currentLetter = char;
      currentCount = 1;
    } else {
      currentCount++;
    }
  }

  if (currentCount > 0) {
    result += `${currentCount}${currentLetter}`;
  }
  return result;
}

export function runLengthDecode(encrypted: string): string {
  const encodedPairRegexTemplate = new RegExp(/(\d+)([a-zA-z])*/g);

  let result = '';

  for (const match of encrypted.matchAll(encodedPairRegexTemplate)) {
    const [, count, letter] = match;
    range(0, Number.parseInt(count), 1).forEach(() => (result += letter));
  }

  return result;
}
