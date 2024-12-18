export function deletingPalindromes(
  word: string,
  maxDeletes: number
): string | null {
  if (isPalindrome(word)) {
    return word;
  }

  return null;
}

export function isPalindrome(word: string): boolean {
  const [first, second] = splitArrayEvenly(word);
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[second.length - 1 - i]) return false;
  }
  return true;
}

type Sliceable = {
  length: number;
  /** biome-ignore lint: i dont know */
  slice: Function;
};

export function splitArrayEvenly<T>(arr: Sliceable): [Array<T>, Array<T>] {
  return [
    arr.slice(0, Math.floor(arr.length / 2)),
    arr.slice(Math.ceil(arr.length / 2), arr.length),
  ];
}
