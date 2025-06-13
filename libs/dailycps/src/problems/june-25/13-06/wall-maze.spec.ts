import { createDistanceMap, scanNeighbours, wallMaze } from './wall-maze';

describe('Wall Maze', () => {
  test.each([
    [
      [
        [false, false],
        [false, false],
      ],
      new Map([
        ['0,0', Number.MAX_SAFE_INTEGER],
        ['0,1', Number.MAX_SAFE_INTEGER],
        ['1,0', Number.MAX_SAFE_INTEGER],
        ['1,1', Number.MAX_SAFE_INTEGER],
      ]),
    ],
  ])('createUnvisitedSet()', (maze, unvisitedSet) => {
    expect(createDistanceMap(maze)).toEqual(unvisitedSet);
  });

  test('Scan neighbours', () => {
    expect(new Set(scanNeighbours(0, 0))).toEqual(
      new Set([
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ])
    );
  });

  test('sample input', () => {
    const maze = [
      [false, false, false, false],
      [true, true, false, true],
      [false, false, false, false],
      [false, false, false, false],
    ];
    const start: [number, number] = [3, 0];
    const end: [number, number] = [0, 0];

    expect(wallMaze(maze, start, end)).toEqual(7);
  });
});
