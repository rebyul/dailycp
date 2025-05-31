import { genNumber } from './billionSort';

describe('Billion sort', () => {
  test('Sort two numbers', () => {
    const input = Array.from(genNumber(2, 1000000000));
    console.log(input);
  });
});
