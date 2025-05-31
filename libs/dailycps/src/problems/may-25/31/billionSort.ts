/**
 * This problem was asked by Amazon.

Given an array of a million integers between zero and a billion, out of order,
h ow can you efficiently sort it? Assume that you cannot store an array of a
billion elements in memory.
*/

// Randomly generate a number
export function* genNumber(numbers: number) {
  for (let i = 0; i < numbers; i++) {
    yield Math.floor(Math.random() * 1000000000);
  }
}

function billionSort() {}
