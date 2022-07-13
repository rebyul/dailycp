/**
 * This problem was asked by Google.

You are given an M by N matrix consisting of booleans that represents a board.
 Each True boolean represents a wall. Each False boolean represents a tile you can walk on.

Given this matrix, a start coordinate, and an end coordinate, return the minimum number of
steps required to reach the end coordinate from the start. If there is no possible path,
then return null. You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.

For example, given the following board:

[[f, f, f, f],
[t, t, f, t],
[f, f, f, f],
[f, f, f, f]]
and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required to reach the end is 7,
since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
 */

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function shortestPathFinder(
  board: boolean[][],
  start: number[],
  end: number[]
): number | null {
  const [sY, sX] = start,
    [eY, eX] = end,
    boardWidth = board[0].length,
    boardHeight = board.length,
    minDistance: Map<string, number> = new Map();

  // Short circuit if we start at the end
  if (sY === eY && sX === eX) {
    return 0;
  }

  // Set distance to starting position as 0
  minDistance.set(`${sY},${sX}`, 0);

  // Initialize queueu
  const queue = [];
  queue.push([sY, sX]);

  // while queue is not empty
  while (queue.length > 0) {
    // get next queue item
    const [cY, cX] = queue.pop()!;

    // Check neighbours
    directions.forEach(([vX, vY]) => {
      // If it's on the board and not a wall
      if (
        !isOnBoard(boardWidth, boardHeight, cX + vX, cY + vY) ||
        isWall(board, cX + vX, cY + vY)
      ) {
        return;
      }
      // check if it has been visited
      const nextMinDistance = minDistance.get(`${cY + vY},${cX + vX}`);
      const currentMinDistance = minDistance.get(`${cY},${cX}`)!;

      // if it hasnt been explored, add to queueq
      if (!nextMinDistance) {
        minDistance.set(`${cY + vY},${cX + vX}`, currentMinDistance + 1);
        queue.push([cY + vY, cX + vX]);
        return;
      }
      // If previous saved distance to the next position is longer than current min +1 update it
      else if (nextMinDistance > currentMinDistance + 1) {
        minDistance.set(`${cY + vY},${cX + vX}`, currentMinDistance + 1);
        queue.push([cY + vY, cX + vX]);
        return;
      }
    });
  }

  return minDistance.get(`${eY},${eX}`) || null;
}

function isWall(board: boolean[][], x: number, y: number) {
  return board[y][x];
}

function isOnBoard(
  boardwidth: number,
  boardheight: number,
  x: number,
  y: number
) {
  return x < boardwidth && y < boardheight && x >= 0 && y >= 0;
}
