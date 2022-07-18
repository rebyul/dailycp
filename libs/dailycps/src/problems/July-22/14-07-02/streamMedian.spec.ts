import { Stream } from 'stream';
import { streamMedian } from './streamMedian';

describe('Stream medians', () => {
  test('.streamMedian()', () => {
    const numbers = [2, 1, 5, 7, 2, 0, 5];
    const input = Stream.Readable.from(numbers);
    const outputStream = streamMedian(input);
    const results: number[] = [];

    outputStream.on('newMedian', (number) => {
      results.push(number);
    });

    outputStream.on('end', () => {
      expect(results).toEqual([2, 1.5, 2, 3.5, 2, 2, 2]);
    });

    numbers.forEach((n) => input.emit('newNumber', n));

    input.emit('end');
  });
});
