/**
 * This problem was asked by Microsoft.

Compute the running median of a sequence of numbers.
That is, given a stream of numbers, print out the median of the list so far on each new element.

Recall that the median of an even-numbered list is the average of the two middle numbers.

For example, given the sequence [2, 1, 5, 7, 2, 0, 5], your algorithm should print out:

2
1.5
2
3.5
2
2
2
 */
import { Stream } from 'stream';
// [2]
// left = null median = 2 right = null
// [2,1]
// left = 2 median = 2 right = null
// left = 1 median = 2
// [2,1,5]
// left = 1 right = 5
export function streamMedian(numbers: Stream): Stream {
  const outputStream = new Stream();
  let leftMedian = Number.NEGATIVE_INFINITY,
    median = NaN,
    rightMedian = Number.POSITIVE_INFINITY,
    isEven = true;

  numbers.on('newNumber', (number: number) => {
    isEven = !isEven;

    if (isNaN(median)) {
      median = number;
      return;
    }

    if (number < median && number > leftMedian) {
      leftMedian = number;
    } else if (number < leftMedian)
      median = isEven ? (leftMedian + rightMedian) / 2 : leftMedian;

    outputStream.emit('newMedian', median);
  });

  numbers.on('end', () => {
    outputStream.emit('end');
  });

  return outputStream;
}
