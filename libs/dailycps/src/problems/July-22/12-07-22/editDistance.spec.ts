import { editDistance } from './editDistance';

describe('Edit distance', () => {
  test.each([
    ['kitten', 'sitting', 3],
    ['oppa', 'sweetie', 7],
    ['same', 'same', 0],
    ['cat', 'catbed', 3],
  ])('.editDistance(%s, %s) returns %d', (wordA, wordB, distance) => {
    expect(editDistance(wordA, wordB)).toEqual(distance);
  });
});
