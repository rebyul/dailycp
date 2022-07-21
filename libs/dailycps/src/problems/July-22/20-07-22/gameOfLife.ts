/**
 * Conway's Game of Life takes place on an infinite two-dimensional board of square cells.
 * Each cell is either dead or alive, and at each tick, the following rules apply:

Any live cell with less than two live neighbours dies.
Any live cell with two or three live neighbours remains living.
Any live cell with more than three live neighbours dies.
Any dead cell with exactly three live neighbours becomes a live cell.
A cell neighbours another cell if it is horizontally, vertically, or diagonally adjacent.

Implement Conway's Game of Life. It should be able to be initialized with a starting list
of live cell coordinates and the number of steps it should run for.
Once initialized, it should print out the board state at each step. Since it's an infinite board,
print out only the relevant coordinates, i.e. from the top-leftmost live cell to bottom-rightmost live cell.

You can represent a live cell with an asterisk (*) and a dead cell with a dot (.).
 */
export function gameOfLife(cells: [number, number][], ticks: number) {
  let liveCells = cells,
    boardParams = getBoardParams(liveCells),
    normalizedBoard = populateNormalizedBoard(liveCells, boardParams);

  printBoard(normalizedBoard);
  for (let tick = 0; tick < ticks; tick++) {
    liveCells = iterate(normalizedBoard);

    boardParams = getBoardParams(liveCells);

    normalizedBoard = populateNormalizedBoard(liveCells, boardParams);
    printBoard(normalizedBoard);
  }
  return normalizedBoard;
}

function populateNormalizedBoard(
  cells: [number, number][],
  boardParams: BoardParams
) {
  const normalizedBoard = createBoard(boardParams);

  const normalizedCells = getNormalizedCells(
    cells,
    boardParams.xNormalizer,
    boardParams.yNormalizer
  );
  populateBoard(normalizedBoard, normalizedCells);
  return normalizedBoard;
}

type Vector = {
  x: number;
  y: number;
};
// Directions from top anticlockwise
const directions: Vector[] = [
  { x: 0, y: 1 }, //top
  { x: -1, y: 1 },
  { x: -1, y: 0 }, // left
  { x: -1, y: -1 },
  { x: 0, y: -1 }, // bottom
  { x: 1, y: -1 },
  { x: 1, y: 0 }, // right
  { x: 1, y: 1 },
];

function iterate(board: number[][]): [number, number][] {
  // for every element
  const newLiveCells: [number, number][] = [];

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let liveNeighbours = 0;
      // Check all its neighbours
      for (const vector of directions) {
        // if neighbour is alive, add it to live neighbour count
        if (
          r + vector.y >= 0 &&
          c + vector.x >= 0 &&
          r + vector.y < board.length &&
          c + vector.x < board[r].length &&
          board[r + vector.y][c + vector.x] === 1
        )
          liveNeighbours++;
      }

      if (liveNeighbours > 1 && liveNeighbours < 4) {
        const isAlive = board[r][c] === 1;
        // Any dead cell with exactly three live neighbours becomes a live cell.
        if (!isAlive && liveNeighbours === 3) {
          newLiveCells.push([c, r]);
        }
        // Any live cell with two or three live neighbours remains living.
        else if ((isAlive && liveNeighbours === 2) || liveNeighbours === 3) {
          newLiveCells.push([c, r]);
        }
      }
      // Any live cell with less than two live neighbours dies.
      // Any live cell with more than three live neighbours dies.
    }
  }
  return newLiveCells;
}

function createBoard(boardParams: BoardParams): number[][] {
  const board = [...Array(boardParams.height)].map(() =>
    [...Array(boardParams.width)].map(() => 0)
  );

  return board;
}

function getNormalizedCells(
  cells: [number, number][],
  x: number,
  y: number
): [number, number][] {
  return cells.map<[number, number]>((c) => {
    return [c[0] + x, c[1] + y];
  });
}

function populateBoard(board: number[][], cells: [number, number][]) {
  cells.forEach((c) => {
    board[c[1]][c[0]] = 1;
  });
}

type BoardParams = {
  xNormalizer: number;
  yNormalizer: number;
  width: number;
  height: number;
};

function getBoardParams(cells: [number, number][]): BoardParams {
  const corners = cells.reduce(
    (a, b) => {
      if (a.bottomLeftX > b[0]) {
        a.bottomLeftX = b[0];
      } else if (a.topRightX < b[0]) {
        a.topRightX = b[0];
      }
      if (a.bottomLeftY > b[1]) {
        a.bottomLeftY = b[1];
      } else if (a.topRightY < b[1]) {
        a.topRightY = b[1];
      }

      return a;
    },
    {
      bottomLeftX: Number.MAX_SAFE_INTEGER,
      bottomLeftY: Number.MAX_SAFE_INTEGER,
      topRightX: 0,
      topRightY: 0,
    }
  );

  // Normalize the bottom left corner coords to [1,1]
  const [xNormalizer, yNormalizer] = [
    -corners.bottomLeftX + 1,
    -corners.bottomLeftY + 1,
  ];

  // Create board with 1 row of padding on both sides of x and y axis
  const [boardWidth, boardHeight] = [
    corners.topRightX + xNormalizer + 2,
    corners.topRightY + yNormalizer + 2,
  ];

  return { xNormalizer, yNormalizer, width: boardWidth, height: boardHeight };
}

function printBoard(board: number[][]) {
  let boardString = '';
  for (let i = board.length - 1; i >= 0; i--) {
    let output = '[';
    for (let j = 0; j < board[i].length; j++) {
      output += ` ${board[i][j]}`;
    }
    output += ' ]';
    boardString += `${output}\n`;
  }
  console.log(boardString);
}

// gameOfLife(
//   [
//     [-1, -1],
//     [0, 0],
//     [0, -1],
//   ],
//   2
// );
