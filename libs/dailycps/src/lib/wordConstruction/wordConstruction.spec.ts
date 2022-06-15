import { canConstruct } from './wordConstruction';

describe('Can construct', () => {
  test.each([
    ['abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'], true],
    ['skateboard', ['ab', 'abc', 'cd', 'def', 'abcd'], false],
  ])('.canConstruct', (word, pieces, result) => {
    expect(canConstruct(word, pieces)).toEqual(result);
  });
});
