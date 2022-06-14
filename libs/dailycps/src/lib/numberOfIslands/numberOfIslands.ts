// https://leetcode.com/problems/number-of-islands/

import { flatMap, max, uniq } from 'lodash';

const directions = [
  [-1, 0], // top
  [0, 1], // right
  [1, 0], // bottom
  [0, -1], //left
];

export function numIslands(grid: string[][]): number {
  let islandId = 1;
  const maxWidth = grid[0].length;
  const maxHeight = grid.length;
  const islandMap = grid.map((r) => r.map(() => -1));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isLandCoord(grid, row, col) && isUnexplored(islandMap, row, col)) {
        scapeCoord(islandMap, grid, row, col, islandId, maxWidth, maxHeight);
        islandId++;
      }
    }
  }

  // console.log(islandMap);

  return max(uniq(flatMap(islandMap))) || 0;
  // return islandId - 1; // Leetcode doesn't allow imports
}

function scapeCoord(
  islandMap: number[][],
  grid: string[][],
  row: number,
  col: number,
  islandId: number,
  maxWidth: number,
  maxHeight: number
) {
  if (isUnexplored(islandMap, row, col)) {
    islandMap[row][col] = islandId;
  }
  // Check cardinals for land
  directions.map((d) => {
    const newRow = row + d[0];
    const newCol = col + d[1];

    if (
      isValidCoord(newRow, newCol, maxWidth, maxHeight) &&
      isLandCoord(grid, newRow, newCol) &&
      isUnexplored(islandMap, newRow, newCol)
    ) {
      scapeCoord(
        islandMap,
        grid,
        newRow,
        newCol,
        islandId,
        maxWidth,
        maxHeight
      );
    }
  });

  return islandId;
}

function isLandCoord(grid: string[][], row: number, col: number) {
  return grid[row][col] === '1';
}
function isUnexplored(islandMap: number[][], row: number, col: number) {
  return islandMap[row][col] === -1;
}

function isValidCoord(
  row: number,
  col: number,
  maxWidth: number,
  maxHeight: number
) {
  return row >= 0 && col >= 0 && row < maxHeight && col < maxWidth;
}
