import {
  minLengthWithSpaces,
  justifyLine,
  justifyText,
  splitInput,
} from './justify-text';

describe('justify text', () => {
  test.skip.each([
    [
      ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'],
      16,
      ['What   must   be', 'acknowledgment  ', 'shall be        '],
    ],
    [
      ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'],
      16,
      ['the  quick brown', 'fox  jumps  over', 'the   lazy   dog'],
    ],
    [
      [
        'Science',
        'is',
        'what',
        'we',
        'understand',
        'well',
        'enough',
        'to',
        'explain',
        'to',
        'a',
        'computer.',
        'Art',
        'is',
        'everything',
        'else',
        'we',
        'do',
      ],
      20,
      [
        'Science  is  what we',
        'understand      well',
        'enough to explain to',
        'a  computer.  Art is',
        'everything  else  we',
        'do                  ',
      ],
    ],
  ])('Example input', (input, k, expected) => {
    const res = justifyText(input, k);
    expect(res).toEqual(expected);

    for (const line of res) {
      expect(line.length).toEqual(k);
    }
  });

  test.each([
    [[], 0],
    [['abc'], 3],
    [['abc', 'def'], 7],
  ])('currentLineLength', (input, expected) => {
    expect(minLengthWithSpaces(input)).toEqual(expected);
  });

  test.each([
    [['abc', 'def'], 3, [['abc'], ['def']]],
    [['abc', 'def'], 10, [['abc', 'def']]],
    [['abc', 'def'], 5, [['abc'], ['def']]],
    [
      ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'],
      16,
      [
        ['the', 'quick', 'brown'],
        ['fox', 'jumps', 'over'],
        ['the', 'lazy', 'dog'],
      ],
    ],
    [
      [
        'Science',
        'is',
        'what',
        'we',
        'understand',
        'well',
        'enough',
        'to',
        'explain',
        'to',
        'a',
        'computer.',
        'Art',
        'is',
        'everything',
        'else',
        'we',
        'do',
      ],
      20,
      [
        ['Science', 'is', 'what', 'we'],
        ['understand', 'well'],
        ['enough', 'to', 'explain', 'to'],
        ['a', 'computer.', 'Art', 'is'],
        ['everything', 'else', 'we'],
        ['do'],
      ],
    ],
  ])('splitInput(%s, %s), returns %o', (input, k, expected) => {
    expect(splitInput(input, k)).toEqual(expected);
  });

  test.each([
    [['abc'], 3, 'abc'],
    [['abc'], 10, 'abc       '],
    [['abc', 'def'], 10, 'abc    def'],
    [['the', 'quick', 'brown'], 16, 'the  quick brown'],
    [['fox', 'jumps', 'over'], 16, 'fox  jumps  over'],
    [['the', 'lazy', 'dog'], 16, 'the   lazy   dog'],
  ])('justifyLine(%s, %d) returns %s', (input, k, result) => {
    const res = justifyLine(input, k);
    expect(res).toEqual(result);
    expect(res.length).toEqual(k);
  });
});
