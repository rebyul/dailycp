"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_worker_threads_1 = require("node:worker_threads");
var descSorted = [];
function sortChunk(chunk) {
    // Process specific locally sorted list
    descSorted = chunk.sort(function (a, b) { return b - a; });
    console.log("[Worker]: sorted chunk ".concat(descSorted));
    return;
}
function popSmallest() {
    return descSorted.pop();
}
node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.on('message', function (message) {
    switch (message.action) {
        case 'sort-chunk':
            sortChunk(message.data);
            node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage({
                action: 'sort-chunk',
                data: [], // This is unnecessary as we're just ack that we're done
            });
            break;
        case 'pop-smallest':
            {
                var intermediary = popSmallest();
                // console.log(
                //   `[Worker]: popping queue: ${message.index}, value: ${intermediary}, remaining: ${descSorted}`
                // );
                node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage({
                    action: 'pop-smallest',
                    data: intermediary,
                    index: message.index,
                });
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
