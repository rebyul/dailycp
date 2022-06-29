import { solveNQueens } from './nQueens';

describe('N Queens', () => {
  test.each([
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
    expect(solveNQueens(n, m)).toEqual(expect.arrayContaining(output));
    expect(output).toEqual(expect.arrayContaining(solveNQueens(n, m)));
  });
});
