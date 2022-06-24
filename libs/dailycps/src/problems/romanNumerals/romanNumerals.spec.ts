import { romanToInt } from './romanNumerals';

describe('Roman numerals', () => {
  test.each([
    ['III', 3],
    ['LVIII', 58],
    ['MCMXCIV', 1994],
  ])('.romanToInt(%s)', (input, output) => {
    expect(romanToInt(input)).toEqual(output);
  });
});
