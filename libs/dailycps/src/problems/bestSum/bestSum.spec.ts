import { bestSum } from './bestSum';

describe('Best sum', () => {
  test.each([
    [7, [5, 3, 4, 7], [7]],
    [8, [2, 3, 5], [3, 5]],
    [8, [1, 4, 5], [4, 4]],
    [8, [1, 6, 36, 8, 99, 47], [8]],
    [100, [1, 2, 5, 25], [25, 25, 25, 25]],
  ])('.bestSum(%d, %p)', (sum, numbers, best) => {
    expect(bestSum(sum, numbers)).toEqual(best);
  });
});
