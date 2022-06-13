import { sumpairCheck } from './sumpair';

describe('sum pair check with different inputs and sums', () => {
  test.each([
    { input: [10, 15, 3, 7], sum: 17, expected: true },
    { input: [55, 1, 17, 36], sum: 4, expected: false },
    { input: [55, 1, 17, 36], sum: 91, expected: true },
    { input: [55, 1, 17, 36], sum: 2, expected: false },
    { input: [55, 1, 17, 36], sum: 17, expected: false },
  ])('.sumpairCheck($input, $sum)', ({ input, sum, expected }) => {
    expect(sumpairCheck(input, sum)).toBe(expected);
  });
});
