import { rgbSort } from './rgbSort';

describe('RGB sort', () => {
  test.each([
    [
      ['G', 'B', 'R', 'R', 'B', 'R', 'G'],
      ['R', 'R', 'R', 'G', 'G', 'B', 'B'],
    ],
  ])('.rgbSort(%p) returns %p', (input, output) => {
    expect(rgbSort(input)).toEqual(output);
  });
});
