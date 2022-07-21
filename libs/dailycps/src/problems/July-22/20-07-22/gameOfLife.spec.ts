import { gameOfLife } from './gameOfLife';
describe('Game of life', () => {
  test.each<[[number, number][], number, number[][]]>([
    [
      [
        [-1, -1],
        [0, 0],
        [0, -1],
      ],
      2,
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
    ],
  ])('.gameOfLife(%p, %d)', (cells, ticks, output) => {
    expect(gameOfLife(cells, ticks)).toEqual(output);
  });
});
