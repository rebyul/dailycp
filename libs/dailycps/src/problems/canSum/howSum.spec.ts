import { howSum } from './howSum';

describe('How sum', () => {
  test.each([
    [7, [5, 3, 4, 7], [4, 3]],
    [7, [3, 4], [4, 3]],
    [7, [3, 2], [2, 2, 3]],
    [7, [2, 4], null],
    [8, [2, 3, 5], [2, 2, 2, 2]],
    [300, [7, 14], null],
  ])('.howSum(%d, %p) returns %p', (sum, numbers, output) => {
    expect(howSum(sum, numbers)).toEqual(output);
  });
});
