import { fallingDominos } from './falling-dominos';

describe('falling dominos', () => {
  test('only R dominos', () => {
    const input = 'R..';
    const want = 'RRR';
    const result = fallingDominos(input);
    expect(result.length).toEqual(want.length);
    expect(result).toEqual(want);
  });

  test('only L dominos', () => {
    const input = '..L';
    const want = 'LLL';
    const result = fallingDominos(input);
    expect(result.length).toEqual(want.length);
    expect(result).toEqual(want);
  });

  test('no forces', () => {
    const input = '...';
    expect(fallingDominos(input)).toEqual(input);
  });
  test('invalid input', () => {
    const input = 'meow';
    expect(() => fallingDominos(input)).toThrow('invalid domino');
  });

  test.each([
    // ['.L.R....L', 'LL.RRRLLL'],
    [
      '..R...L.L',
      //['.', '.', 'R', 'R', 'R', 'R', 'L', '.', 'L']
      '..RR.LLLL',
    ],
  ])('given %p, fallingDominos returns %p', (input, want) => {
    const result = fallingDominos(input);
    expect(result.length).toEqual(want.length);
    expect(result).toEqual(want);
  });
});
