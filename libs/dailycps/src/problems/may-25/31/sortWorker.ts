import { parentPort } from 'node:worker_threads';
import {
  PopSmallestMessage,
  BillionSortMessage,
  SortChunkMessage,
} from './billionSort';

let descSorted: number[] = [];

function sortChunk(chunk: number[]) {
  // Process specific locally sorted list
  descSorted = chunk.sort((a, b) => b - a);
  return;
}

function popSmallest() {
  return descSorted.pop();
}

parentPort?.on('message', (message: BillionSortMessage) => {
  switch (message.action) {
    case 'sort-chunk':
      sortChunk(message.data);
      parentPort?.postMessage({
        action: 'sort-chunk',
        data: [], // This is unnecessary as we're just ack that we're done
      } satisfies SortChunkMessage);
      break;
    case 'pop-smallest':
      parentPort?.postMessage({
        action: 'pop-smallest',
        data: popSmallest(),
      } satisfies PopSmallestMessage);
  }
});
