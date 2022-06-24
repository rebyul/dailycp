import { floodFill } from './floodfill';

describe('floodfill', () => {
  it('leetcode', () => {
    const image = [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
      ],
      sr = 1,
      sc = 1,
      newColor = 2;
    expect(floodFill(image, sr, sc, newColor)).toEqual([
      [2, 2, 2],
      [2, 2, 0],
      [2, 0, 1],
    ]);
  });
  it('submission', () => {
    const image = [
        [0, 0, 0],
        [0, 1, 1],
      ],
      sr = 1,
      sc = 1,
      newColor = 1;
    expect(floodFill(image, sr, sc, newColor)).toEqual([
      [0, 0, 0],
      [0, 1, 1],
    ]);
  });
});
