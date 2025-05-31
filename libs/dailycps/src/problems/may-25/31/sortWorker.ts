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
      console.log('[Worker]: sort-chunk work');
      sortChunk(message.data);
      parentPort?.postMessage({
        action: 'sort-chunk',
        data: [], // This is unnecessary as we're just ack that we're done
        index: message.index,
      } satisfies SortChunkMessage);
      break;
    case 'pop-smallest':
      console.log(`[Worker]: popping ${message.index}`);
      parentPort?.postMessage({
        action: 'pop-smallest',
        data: popSmallest(),
        index: message.index,
      } satisfies PopSmallestMessage);
      break;
  }
});

// parentPort?.on('sort-chunk', (message: SortChunkMessage) => {
//   sortChunk(message.data);
//   parentPort?.postMessage({
//     action: 'sort-chunk',
//     data: [], // This is unnecessary as we're just ack that we're done
//     index: message.index,
//   } satisfies SortChunkMessage);
// });
//
// parentPort?.on('pop-smallest', (message: PopSmallestMessage) => {
//   parentPort?.postMessage({
//     action: 'pop-smallest',
//     data: popSmallest(),
//     index: message.index,
//   } satisfies PopSmallestMessage);
// });
