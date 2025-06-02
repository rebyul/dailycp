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
  console.log(`[Worker]: sorted chunk ${descSorted}`);
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
      {
        const intermediary = popSmallest();
        // console.log(
        //   `[Worker]: popping queue: ${message.index}, value: ${intermediary}, remaining: ${descSorted}`
        // );
        parentPort?.postMessage({
          action: 'pop-smallest',
          data: intermediary,
          index: message.index,
        } satisfies PopSmallestMessage);
      }
      break;
  }
});

// parentPort?.on('sort-chunk', (message: SortChunkMessage) => {
//   console.log('sorting');
//   sortChunk(message.data);
//   parentPort?.postMessage({
//     action: 'sort-chunk',
//     data: [], // This is unnecessary as we're just ack that we're done
//   } satisfies SortChunkMessage);
// });
//
// parentPort?.on('pop-smallest', (message: PopSmallestMessage) => {
//   console.log(`[Worker]: popping ${message.index}`);
//   parentPort?.postMessage({
//     action: 'pop-smallest',
//     data: popSmallest(),
//     index: message.index,
//   } satisfies PopSmallestMessage);
// });
