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
  for (let i = 0; i < Math.ceil(word.length / 2); i++) {
    if (word[i] === word[word.length - 1 - i]) {
      continue;
    }
    // console.error(
    //   `${word}: At ${i} ${word[i]} and ${
    //     word[word.length - 1 - i]
    //   } are not equal`
    // );
    return false;
  }

  return true;
}

export function splitArrayEvenly<T>(arr: Array<T>): [Array<T>, Array<T>] {
  return [
    arr.slice(0, Math.floor(arr.length / 2)),
    arr.slice(Math.ceil(arr.length / 2), arr.length),
  ];
}
