import { gridTraveler } from './gridTraveler';

describe('Grid Tree', () => {
  test.each([
    [1, 1, 1],
    [2, 3, 3],
    [3, 2, 3],
    [3, 3, 6],
    [18, 18, 2333606220],
  ])('.gridTraveler(%d, %d)', (m, n, output) => {
    expect(gridTraveler(n, m)).toEqual(output);
  });
});
