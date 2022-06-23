import { noOfCiphers } from './linearCaesareanCipher';

describe('Linear caesarean cipher', () => {
  test.each([
    ['111', 3],
    ['1111', 5],
    ['1212', 5],
  ])('.noOfCiphers(%p) returns %d', (input, output) => {
    expect(noOfCiphers(input)).toEqual(output);
  });
});
