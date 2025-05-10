import { getPair, getKaprekarsConstant } from './kaprekars-constant';

describe("Kaprekar's constant", () => {
  test.each([[1234, 3]])('Full test', (input, steps) => {
    expect(getKaprekarsConstant(input)).toEqual(steps);
  });

  test.each([
    [1234, [1234, 4321]],
    [1230, [123, 3210]],
    [3087, [378, 8730]],
    [8352, [2358, 8532]],
  ])('getPair(%d) returns %s', (input, expected) => {
    expect(getPair(input)).toEqual(expected);
  });
});
