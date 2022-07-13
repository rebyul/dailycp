import { reconstructDictionary } from './wordReconstruction';

describe('Word reconstruction', () => {
  test.each([
    [
      ['quick', 'brown', 'the', 'fox'],
      'thequickbrownfox',
      ['the', 'quick', 'brown', 'fox'],
    ],
    [['quick', 'the', 'fox'], 'thequickbrownfox', null],
    [
      ['bed', 'bath', 'bedbath', 'and', 'beyond'],
      'bedbathandbeyond',
      ['bed', 'bath', 'and', 'beyond'],
    ],
  ])(
    'reconstructDictionary(%p, %s) returns %p',
    (dictionary, sentence, output) => {
      expect(reconstructDictionary(dictionary, sentence)).toEqual(output);
    }
  );
});
