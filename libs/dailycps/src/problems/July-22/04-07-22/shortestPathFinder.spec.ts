import { shortestPathFinder } from './shortestPathfinder';

describe('Shortest path finder', () => {
  test.each([
    [
      [
        [false, false, false, false],
        [true, true, false, true],
        [false, false, false, false],
        [false, false, false, false],
      ],
      [3, 0],
      [0, 0],
      7,
    ],
    [
      [
        [false, false, false, false],
        [true, true, false, true],
        [false, false, false, false],
        [false, false, false, false],
      ],
      [3, 3],
      [0, 0],
      6,
    ],
  ])(
    'shortestPathFinder(%p, %p, %p) returns %d',
    (board, start, end, output) => {
      expect(shortestPathFinder(board, start, end)).toEqual(output);
    }
  );
});
