/**
 * This problem was asked by Palantir.

Write an algorithm to justify text. Given a sequence of words and an integer line
length k, return a list of strings which represents each line, fully justified.

More specifically, you should have as many words as possible in each line.
There should be at least one space between each word. Pad extra spaces when
necessary so that each line has exactly length k. Spaces should be distributed
as equally as possible, with the extra spaces, if any, distributed starting from
the left.

If you can only fit one word on a line, then you should pad the right-hand side
with spaces.

Each word is guaranteed not to be longer than k.

For example, given the list of words ["the", "quick", "brown", "fox", "jumps",
"over", "the", "lazy", "dog"] and k = 16, you should return the following:

["the  quick brown", # 1 extra space on the left
"fox  jumps  over", # 2 extra spaces distributed evenly
"the   lazy   dog"] # 4 extra spaces distributed evenly
*/

export function justifyText(input: string[], k: number): string[] {
  // Split input into arrays of max k length
  const split = splitInput(input, k);
  return split.map((i) => justifyLine(i, k));
}

export function splitInput(input: string[], k: number): string[][] {
  const result: string[][] = [];
  let accLine: string[] = [];

  for (const word of input) {
    if (minLengthWithSpaces(accLine) + word.length <= k) {
      accLine.push(word);
    } else {
      result.push(accLine);
      accLine = [word];
    }
  }
  // Add last accLine
  result.push(accLine);
  return result;
}

export function justifyLine(input: string[], k: number): string {
  if (input.length === 1) {
    return input[0] + ' '.repeat(k - input[0].length);
  }

  let spacesToAdd = k - input.join('').length,
    i = 0;

  while (spacesToAdd > 0) {
    if (i % input.length !== input.length - 1) {
      input[i % input.length] = input[i % input.length] + ' ';
      spacesToAdd--;
    }
    i++;
  }

  return input.join('');
}

export function minLengthWithSpaces(input: string[]) {
  return input.join(' ').length;
}
