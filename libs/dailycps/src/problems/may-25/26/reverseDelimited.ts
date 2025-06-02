/**
 * This problem was asked by Facebook.

Given a string and a set of delimiters, reverse the words in the string while
maintaining the relative order of the delimiters. For example, given "hello/world:here",
return "here/world:hello"

Follow-up: Does your solution work for the following cases: "hello/world:here/", "hello//world:here"
*/

/**
 * Thoughts
 * no of delimiters < no of words
 * why does the follow-up example print in that order?
 * i guess it can't print a delimiter first? so prints the word first, but then
 * shouldn't it print (blank)/here:world/hello?
 */

export function reverseDelimited(input: string): string {
  if (input.length === 0) {
    return '';
  }
  const delimiterSet = new Set(['/', ':']);

  let currentWord = '';
  const words = [];
  const delimiters = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (delimiterSet.has(char)) {
      delimiters.push(char);
      // Add the current word to the words set
      if (currentWord.length > 0) {
        words.push(currentWord);
        // Reset current word as we've met a delimiter
        currentWord = '';
      }
    } else if (i === input.length - 1) {
      if (currentWord.length > 0) {
        currentWord += char;
        words.push(currentWord);
      }
    } else {
      currentWord += char;
    }
  }

  const delimitersStack = delimiters.toReversed();

  let outputString = '';

  while (words.length > 0 || delimitersStack.length > 0) {
    const nextWord = words.pop();
    if (nextWord !== undefined) {
      outputString += nextWord;
    }

    const nextDelim = delimitersStack.pop();
    if (nextDelim !== undefined) {
      outputString += nextDelim;
    }
  }

  return outputString;
}
