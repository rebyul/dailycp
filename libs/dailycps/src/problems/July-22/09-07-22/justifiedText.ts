/**
 * This problem was asked by Palantir.

Write an algorithm to justify text. Given a sequence of words and an integer line length k,
 return a list of strings which represents each line, fully justified.

More specifically, you should have as many words as possible in each line.
 There should be at least one space between each word.
 Pad extra spaces when necessary so that each line has exactly length k.
  Spaces should be distributed as equally as possible, with the extra spaces,
   if any, distributed starting from the left.

If you can only fit one word on a line, then you should pad the right-hand side with spaces.

Each word is guaranteed not to be longer than k.

For example, given the list of words ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"] and k = 16,
you should return the following:

["the  quick brown", # 1 extra space on the left
"fox  jumps  over", # 2 extra spaces distributed evenly
"the   lazy   dog"] # 4 extra spaces distributed evenly
 */

export function justifyText(input: string[], length: number): string[] {
  const output: string[] = [];
  let currentWords: string[] = [];

  for (let index = 0; index < input.length; index++) {
    const word = input[index];

    // if current + word doesn't go over the max length, append it
    if (currentWords.join(' ').length + word.length + 1 <= length) {
      currentWords.push(word);
      continue;
    }
    // Need to justify current and add to output
    else {
      const justified = justifyCurrent(currentWords, length);
      output.push(justified);
      currentWords = [word];
    }
  }

  // If there are any words still being counted, justify and add to output
  if (currentWords.length !== 0) {
    output.push(justifyCurrent(currentWords, length));
  }
  return output;
}

function justifyCurrent(currentWords: string[], length: number): string {
  // If we only have one word in current, pad the end and add it to the entry
  if (currentWords.length === 1) {
    return currentWords[0].padEnd(length, ' ');
  }
  // Find how many spaces we need
  const extraSpaces = length - currentWords.join(' ').length;
  if (extraSpaces === 0) {
    return currentWords.join(' ');
  } else {
    // Rotationally add a right space to every word except the last in the array
    for (let j = 0; j < extraSpaces; j++) {
      if ((j % currentWords.length) - 1 === currentWords.length - 1) {
        // Don't j++ as we haven't added a space
        j--;
        continue;
      }
      currentWords[j % (currentWords.length - 1)] += ' ';
    }
    return currentWords.join(' ');
  }
}
