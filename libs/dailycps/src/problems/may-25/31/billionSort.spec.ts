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

  test.only('Sort 10 numbers', async () => {
    {
      const numStore: number[] = [];
      const input = Array.from([92, 74, 73, 59, 10, 97, 93, 68, 67, 2]);
      // const input = Array.from(genNumbers(10, 100));
      publisher.addListener('new_num', (n) => newNumberSubscriber(numStore, n));

      for (const num of input) {
        publisher.emit('new_num', num);
      }

      expect(await getSorted(numStore, 5)).toEqual(input.sort((a, b) => a - b));
    }
  }, 10000);
});
