export function canConstruct(word: string, pieces: string[]): boolean {
  if (word === '') return true;

  for (const piece of pieces.filter((p) => p.charAt(0) === word.charAt(0))) {
    if (canConstruct(piece.substring(piece.length - 1, word.length), pieces))
      return true;
  }

  return false;
}
