import { allConstruct, canConstruct, countConstruct } from './wordConstruction';

describe('Word construction', () => {
  test.each([
    ['abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'], true],
    ['skateboard', ['ab', 'abc', 'cd', 'def', 'abcd'], false],
    ['', ['ab', 'cd'], true],
    [
      'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',
      ['e', 'ee', 'eee', 'eeee', 'eeeee'],
      false,
    ],
  ])('.canConstruct(%s, %p)', (word, pieces, result) => {
    expect(canConstruct(word, pieces)).toEqual(result);
  });

  test.each([
    ['abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'], 1],
    ['skateboard', ['ab', 'abc', 'cd', 'def', 'abcd'], 0],
    ['', ['ab', 'cd'], 1],
    [
      'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',
      ['e', 'ee', 'eee', 'eeee', 'eeeee'],
      0,
    ],
  ])('.countConstruct(%s, %p)', (word, pieces, result) => {
    expect(countConstruct(word, pieces)).toEqual(result);
  });
  test.each([
    [
      'purple',
      ['purp', 'p', 'ur', 'le', 'purpl'],
      [
        ['purp', 'le'],
        ['p', 'ur', 'p', 'le'],
      ],
    ],
    [
      'abcdef',
      ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'],
      [
        ['ab', 'cd', 'ef'],
        ['ab', 'c', 'def'],
        ['abc', 'def'],
        ['abcd', 'ef'],
      ],
    ],
    [
      'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',
      ['e', 'ee', 'eee', 'eeee', 'eeeee'],
      [],
    ],
  ])('.allConstruct(%s, %p)', (word, pieces, output) => {
    expect(allConstruct(word, pieces)).toEqual(output);
  });
});
