/**
 * Given a board of size n * n, return a possible combination where m number of queens
 * can be place on the board without attacking each other.
 * If there are no combinations return an empty array
 */
export function solveNQueens(n: number, m: number): [number, number][] {
  const board: number[][] = [...Array(n)].map(() => [...Array(n)].map(() => 0));

  const firstCombination = findFirstCombination(board, m);
  const queens = getQueens(board);
  printBoard(board);

  // Print all combinations for fun
  // const board: number[][] = [...Array(n)].map(() => [...Array(n)].map(() => 0));

  // const allCombinations = getAllCombinations(board, m);
  // console.log(
  //   '🚀 ~ file: nQueens.ts ~ line 11 ~ solveNQueens ~ allCombinations',
  //   allCombinations
  // );

  // If all queens are placed, return their positions
  if (firstCombination) return queens;
  return [];
}

function findFirstCombination(board: number[][], queenCount: number): boolean {
  if (queenCount === 0) return true;
  let safe = false;

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      // If queen has already placed here, continue
      if (board[r][c] === 1) continue;
      // Place queen at r, c
      board[r][c] = 1;
      // Check if board is safe
      safe = checkBoard(board);
      if (safe) {
        const recurse = findFirstCombination(board, queenCount - 1);
        if (recurse) return safe;
      }
      board[r][c] = 0;
    }
  }

  return false;
}

function getAllCombinations(
  board: number[][],
  queenCount: number
): Array<number[][]> {
  if (queenCount === 0 && checkBoard(board)) {
    return [board];
  }

  const results: Array<typeof board> = [];

  for (let r = board.length - queenCount; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      // If queen has already placed here, continue
      if (board[r][c] === 1) continue;
      // Place queen at r, c
      board[r][c] = 1;
      // Check if board is safe
      if (checkBoard(board)) {
        const recurse = getAllCombinations(board, queenCount - 1);
        if (recurse.length > 0) {
          results.push(...JSON.parse(JSON.stringify(recurse)));
          board[r][c] = 0;
          continue;
        }
      }
      board[r][c] = 0;
    }
  }

  return results;
}

function checkBoard(board: number[][]): boolean {
  const queens = getQueens(board);

  for (let i = 0; i < queens.length; i++) {
    const [qRow, qCol] = queens[i];
    for (let j = i + 1; j < queens.length; j++) {
      const [oQRow, oQCol] = queens[j];

      // Row check
      if (qRow === oQRow) return false;
      // Column check
      if (qCol === oQCol) return false;
      // Diagonal check using gradient = 1
      if (Math.abs((qCol - oQCol) / (qRow - oQRow)) === 1) {
        return false;
      }
    }
  }

  return true;
}

function getQueens(board: number[][]): [number, number][] {
  const result: [number, number][] = [];
  for (const [rIndex, row] of board.entries()) {
    for (const [cIndex, position] of row.entries()) {
      if (position === 1) {
        result.push([rIndex, cIndex]);
      }
    }
  }
  return result;
}

function printBoard(board: number[][]) {
  let bString = '';

  for (const row of board) {
    bString += `${row}\n`;
  }
  console.log(bString);
}
