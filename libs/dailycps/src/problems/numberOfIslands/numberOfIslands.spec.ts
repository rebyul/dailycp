import { numIslands } from './numberOfIslands';

describe('number of islands', () => {
  test.each([
    {
      grid: [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
      ],
      output: 1,
    },
    {
      grid: [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
      ],
      output: 3,
    },
    {
      grid: [
        ['1', '1', '1'],
        ['0', '1', '0'],
        ['1', '1', '1'],
      ],
      output: 1,
    },
  ])('.numberOfIslands($grid, $output', ({ grid, output }) => {
    expect(numIslands(grid)).toBe(output);
  });
});
