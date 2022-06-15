export function canConstruct(
  word: string,
  pieces: string[],
  memo: { [key: string]: boolean } = {}
): boolean {
  if (word in memo) return memo[word];
  if (word.length === 0) return true;

  for (const piece of pieces.filter((p) => word.indexOf(p) === 0)) {
    const substring = word.slice(piece.length);

    if (canConstruct(substring, pieces, memo) === true) {
      memo[word] = true;
      return true;
    }
  }
  memo[word] = false;
  return false;
}

export function countConstruct(
  word: string,
  pieces: string[],
  memo: { [key: string]: number } = {}
): number {
  if (word in memo) return memo[word];
  if (word === '') {
    return 1;
  }

  let count = 0;

  for (const piece of pieces) {
    if (word.indexOf(piece) === 0) {
      const substring = word.slice(piece.length);

      count += countConstruct(substring, pieces, memo);
    }
  }
  memo[word] = count;
  return count;
}

export function allConstruct(
  word: string,
  pieces: string[],
  memo: { [key: string]: string[][] } = {}
) {
  if (word in memo) return memo[word];
  if (word === '') {
    return [[]];
  }

  const combinations: string[][] = [];

  for (const piece of pieces) {
    if (word.indexOf(piece) === 0) {
      const substring = word.slice(piece.length);
      const suffixWays = allConstruct(substring, pieces, memo);
      if (suffixWays !== null) {
        const prefixWays = suffixWays.map((way) => [piece, ...way]);
        combinations.push(...prefixWays);
      }
    }
  }

  memo[word] = combinations;
  return memo[word];
}
