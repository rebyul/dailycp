import { Stream } from 'stream';
import { streamMedian } from './streamMedian';

describe('Stream medians', () => {
  test('.streamMedian()', () => {
    const numbers = [2, 1, 5, 7, 2, 0, 5];
    const input = Stream.Readable.from(numbers);
    const outputStream = streamMedian(input);

    numbers.forEach((n) => input.emit('newNumber', n));

    const results: number[] = [];
    outputStream.on('newMedian', (number) => {
      console.log(
        '🚀 ~ file: streamMedian.spec.ts ~ line 14 ~ outputStream.on ~ number',
        number
      );
      results.push(number);
    });

    input.emit('end');
    outputStream.on('end', () => {
      console.log(results);

      expect(results).toEqual([2, 1.5, 2, 3.5, 2, 2, 2]);
    });
  });
});
