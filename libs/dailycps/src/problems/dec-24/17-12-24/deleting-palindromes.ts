/**
  This problem was asked by Google.

Given a string which we can delete at most k, return whether you can make a palindrome.

For example, given 'waterrfetawx' and a k of 2, you could delete f and x to get 'waterretaw'.
*/
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

type Sliceable<T> =
  | Array<T>
  | {
      length: number;
      slice: (start?: number, end?: number) => Sliceable<T> | T[];
      [index: number]: Sliceable<T>;
    };

type ReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

export function splitArrayEvenly<T>(
  arr: Sliceable<T>
): [ReturnType<Sliceable<T>['slice']>, ReturnType<Sliceable<T>['slice']>] {
  return [
    // Slice is end non-inclusive so
    arr.slice(0, Math.floor(arr.length / 2)),
    arr.slice(Math.ceil(arr.length / 2), arr.length),
  ];
}
