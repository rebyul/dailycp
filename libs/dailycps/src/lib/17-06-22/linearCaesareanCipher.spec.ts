import { noOfCiphers } from './linearCaesareanCipher';

describe('Linear caesarean cipher', () => {
  test.each([['111', 3]])('.noOfCiphers(%p) returns %d', (input, output) => {
    expect(noOfCiphers(input)).toEqual(output);
  });
});
