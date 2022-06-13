import { sumpairCheck } from './main';

describe('sum pairs with input [10, 15, 3, 7] with different sums', () => {
  const input = [10, 15, 3, 7];

  it('should be true for sum 17', () => {
    const sum = 17;
    const actual = sumpairCheck(input, sum);
    expect(actual).toBe(true);
  });

  it('should be false for sum 4', () => {
    const sum = 4;
    const actual = sumpairCheck(input, sum);
    expect(actual).toBe(false);
  });

  it('should be true for sum 17', () => {
    const sum = 17;
    const actual = sumpairCheck(input, sum);
    expect(actual).toBe(true);
  });
});
