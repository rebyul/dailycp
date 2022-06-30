import { solveNQueens } from './nQueens';

describe('N Queens', () => {
  test.each([
    [2, 1, [[0, 0]]],
    [
      4,
      4,
      [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
    ],
    [
      6,
      6,
      [
        [0, 1],
        [1, 3],
        [2, 5],
        [3, 0],
        [4, 2],
        [5, 4],
      ],
    ],
  ])('.solveNQueens(%d, %d) returns %p', (n, m, output) => {
    const result = solveNQueens(n, m);
    expect(result).toEqual(expect.arrayContaining(output));
    expect(output).toEqual(expect.arrayContaining(result));
  });
});
