import { EventEmitter } from 'node:events';
import {
  newNumberSubscriber,
  SortEmitter,
  genNumbers,
  getSorted,
} from './billionSort';

describe('Billion sort', () => {
  let publisher: SortEmitter;

  beforeAll(() => {
    publisher = new EventEmitter({
      captureRejections: true,
    });
  });

  test.skip('Sort two numbers', async () => {
    const numStore: number[] = [];
    const input = Array.from(genNumbers(2, 1000000000));
    publisher.addListener('new_num', (n) => newNumberSubscriber(numStore, n));

    for (const num of input) {
      publisher.emit('new_num', num);
    }

    expect(await getSorted(numStore, 100)).toEqual(input.sort());
  });

  test('Sort 100 numbers', async () => {
    {
      const numStore: number[] = [];
      const input = Array.from(genNumbers(100, 1000000000));
      publisher.addListener('new_num', (n) => newNumberSubscriber(numStore, n));

      for (const num of input) {
        publisher.emit('new_num', num);
      }

      expect(await getSorted(numStore, 10)).toEqual(input.sort());
    }
  });
});
