/**
 * This problem was asked by Amazon.

Given an array of a million integers between zero and a billion, out of order,
h ow can you efficiently sort it? Assume that you cannot store an array of a
billion elements in memory.
*/

import { Worker } from 'node:worker_threads';
import { EventEmitter } from 'node:events';
import path = require('node:path');

// Randomly generate a number
export function genNumber(maxValue: number) {
  return Math.floor(Math.random() * maxValue);
}

export function* genNumbers(count: number, maxValue: number) {
  for (let i = 0; i < count; i++) {
    yield genNumber(maxValue);
  }
}

type SortEvents = { new_num: [number] };

export type SortEmitter = EventEmitter<SortEvents>;
// If we were to be space efficient, we could do the timeout on array value sorter
// To be time efficient...

// Image this is writing to disk or something
export function newNumberSubscriber(numStore: number[], n: number) {
  numStore.push(n);
}

export type SortChunkMessage = {
  action: 'sort-chunk';
  data: number[];
  index: number;
};

export type PopSmallestMessage = {
  action: 'pop-smallest';
  data: number | undefined;
  index: number;
};

export type BillionSortMessage = SortChunkMessage | PopSmallestMessage;

export async function getSorted(numStore: number[], maxChunkSize: number) {
  // Safe to assume that if the list is shorter than the num of workers
  // we can sort in memory
  if (numStore.length < maxChunkSize) {
    return numStore.sort();
  }

  const workers: Worker[] = [];
  const workerPromises: Promise<unknown>[] = [];
  const sortedArray: number[] = [];

  // Assuming the list of numbers is larger than the number of workers
  // Chunk the numStore
  // This is simulating reading parts of the file

  try {
    const iter = readNumbers(numStore);

    const sortResolves: (((value: unknown) => void) | undefined)[] = [];

    while (true) {
      const chunkIterator = iter.take(maxChunkSize);
      // We've filled the chunk. Send it off the work
      const chunk = chunkIterator.toArray();
      if (chunk.length === 0) {
        break;
      }

      const workerPath = path.resolve(__dirname, './sortWorker.js');

      console.log(`[Main] Worker script path: ${workerPath}`);

      const worker = new Worker(workerPath);
      // Save the workers to reference later
      const workerIndex = workers.push(worker) - 1;

      worker.on('message', (m: BillionSortMessage) => {
        managerWork(m);
      });
      // worker.on('error', () => {
      //   throw new Error('worker error');
      // });
      // worker.on('exit', (code) => {
      //   console.log(code);
      //   if (code !== 0) {
      //     throw new Error(`Worker stopped with exit code ${code}`);
      //   }
      // });
      console.log(`Created worker ${workerIndex}`);
      const sortedPromise = new Promise((resolve, reject) => {
        sortResolves[workerIndex] = resolve;
      });

      workerPromises.push(sortedPromise);

      console.log('post sort', workerIndex);
      // Send the worker sort work
      worker.postMessage({
        action: 'sort-chunk',
        data: chunk,
        index: workerIndex,
      } satisfies SortChunkMessage);
    }

    // Each worker has sorted all chunks
    console.log('meow', workerPromises);
    await Promise.all(workerPromises);
    console.log('woof', workerPromises);

    const mergeCandiates = Array(workers.length);

    const resolveList: ((() => void) | undefined)[] = Array(
      mergeCandiates.length
    );

    function managerWork(
      m: BillionSortMessage
      // resolve: (args?: any) => void,
      // reject: (error: Error) => void
    ) {
      switch (m.action) {
        case 'sort-chunk':
          console.log('resolve sort:', m.index);
          sortResolves[m.index]?.call(undefined, undefined);
          Promise.resolve(Promise.resolve(workerPromises[m.index]));
          break;
        case 'pop-smallest':
          console.log('popped smallest: ', m.data);
          mergeCandiates[m.index] = m.data;
          // Resolve at resolve list
          console.log('resolved ', m.index);
          resolveList[m.index]?.call(undefined);
          resolveList[m.index] = undefined;
          break;
        default:
          throw new Error('unknown action');
      }
    }

    // Merge from all workers
    // const mergeCandidates = new MinHeap()
    // const mergeCandiates = Array(workers.length);
    //
    // const resolveList: ((() => void) | undefined)[] = Array(
    //   mergeCandiates.length
    // );

    // Initialize each worker to drop popped values into correct position
    for (let w = 0; w < workers.length; w++) {
      workers[w].on('message', (m: BillionSortMessage) => {
        if (m.action === 'pop-smallest') {
          mergeCandiates[m.index] = m.data;
          // Resolve at resolve list
          console.log('resolved ', m.index);
          resolveList[m.index]?.call(undefined);
          resolveList[m.index] = undefined;
        }
      });
    }

    while (sortedArray.length !== numStore.length) {
      const tickPromises: Promise<void>[] = Array(workers.length);
      // Populate merge candidates
      for (let i = 0; i < mergeCandiates.length; i++) {
        if (mergeCandiates[i] === undefined) {
          tickPromises[i] = new Promise((resolve, reject) => {
            resolveList[i] = resolve;
          });
          workers[i].postMessage({ action: 'pop-smallest', index: i });
        }
      }
      // Wait for all next numbers to resolve
      await Promise.all(tickPromises.filter((p) => p !== undefined));

      // Push the smallest mergeCandidate to the sorted array
      // Cheat a little here to save time
      // Maybe a min heap structure would be best to have here
      // But we also need to know which worker to pull from so array is fine here
      const [smallest, index] = mergeCandiates
        .map((v, i) => {
          return [v, i];
        })
        .reduce(([aValue, aIndex], [cValue, cIndex], i) => {
          if (cValue === undefined) {
            return [aValue, aIndex];
          }
          if (cValue < aValue) {
            return [cValue, i];
          }
          return [aValue, aIndex];
        });

      console.log('[', smallest, ',', index, ']');
      mergeCandiates[index] = undefined;
      sortedArray.push(smallest);
    }
  } finally {
    // Gracefully terminate all workers
    await Promise.all(workers.map((w) => w.terminate()));
  }
  return sortedArray;
}

function* readNumbers(numStore: number[]) {
  for (const num of numStore) {
    yield num;
  }
}
