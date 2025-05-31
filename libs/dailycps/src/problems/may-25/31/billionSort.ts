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
};

export type PopSmallestMessage = {
  action: 'pop-smallest';
  data: number | undefined;
};

export type BillionSortMessage = SortChunkMessage | PopSmallestMessage;

export async function getSorted(numStore: number[], maxChunkSize: number) {
  // Safe to assume that if the list is shorter than the num of workers
  // we can sort in memory
  if (numStore.length < maxChunkSize) {
    return numStore.sort();
  }

  // Assuming the list of numbers is larger than the number of workers
  // Chunk the numStore
  // This is simulating reading parts of the file
  const workers = [];
  const workerPromises = [];
  const iter = readNumbers(numStore);

  while (true) {
    const chunkIterator = iter.take(maxChunkSize);
    // We've filled the chunk. Send it off the work
    const chunk = chunkIterator.toArray();
    if (chunk.length === 0) {
      break;
    }

    const workerPath = path.resolve(__dirname, './sortWorker.ts');

    console.log(`[Main] Worker script path: ${workerPath}`);

    const worker = new Worker(workerPath);
    // Save the workers to reference later
    workers.push(worker);

    const sortedPromise = new Promise((resolve, reject) => {
      worker.on('message', (m: BillionSortMessage) =>
        managerWork(m, resolve, reject)
      );
      worker.on('error', reject);
      worker.on('exit', (code) => {
        console.log(code);
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });

    workerPromises.push(sortedPromise);

    // Send the worker some work
    worker.postMessage({
      action: 'sort-chunk',
      data: chunk,
    } satisfies SortChunkMessage);
  }

  // Each worker has sorted all chunks
  await Promise.all(workerPromises);

  // Merge from all workers
  return;
}

function managerWork(
  response: BillionSortMessage,
  resolve: (args?: any) => void,
  reject: (error: Error) => void
) {
  console.log('response from worker');
  switch (response.action) {
    case 'sort-chunk':
      resolve();
      break;
    case 'pop-smallest':
      resolve(response.data);
      return;
    default:
      reject(Error('unknown action'));
  }
}

function* readNumbers(numStore: number[]) {
  for (const num of numStore) {
    yield num;
  }
}
