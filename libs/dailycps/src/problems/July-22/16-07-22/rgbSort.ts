/**
 * This problem was asked by Google.

Given an array of strictly the characters 'R', 'G', and 'B', segregate the values of the array so that all the Rs come first, the Gs come second, and the Bs come last. You can only swap elements of the array.

Do this in linear time and in-place.

For example, given the array ['G', 'B', 'R', 'R', 'B', 'R', 'G'], it should become ['R', 'R', 'R', 'G', 'G', 'B', 'B'].
 */

export function rgbSort(input: string[]): string[] {
  let rIndex = 0,
    bIndex = input.length - 1,
    currentIndex = 0;

  while (currentIndex <= bIndex) {
    const currentChar = input[currentIndex].toLowerCase();
    if (currentChar === 'b') {
      [input[bIndex], input[currentIndex]] = [
        input[currentIndex],
        input[bIndex],
      ];
      bIndex--;
    } else if (currentChar === 'r') {
      [input[currentIndex], input[rIndex]] = [
        input[rIndex],
        input[currentIndex],
      ];
      rIndex++;
      currentIndex++;
    } else {
      currentIndex++;
    }
  }

  return input;
}
