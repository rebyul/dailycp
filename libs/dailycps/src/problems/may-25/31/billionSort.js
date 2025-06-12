"use strict";
/**
 * This problem was asked by Amazon.

Given an array of a million integers between zero and a billion, out of order,
h ow can you efficiently sort it? Assume that you cannot store an array of a
billion elements in memory.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.genNumber = genNumber;
exports.genNumbers = genNumbers;
exports.newNumberSubscriber = newNumberSubscriber;
exports.getSorted = getSorted;
const node_worker_threads_1 = require("node:worker_threads");
const path = require("node:path");
// Randomly generate a number
function genNumber(maxValue) {
    return Math.floor(Math.random() * maxValue);
}
function* genNumbers(count, maxValue) {
    for (let i = 0; i < count; i++) {
        yield genNumber(maxValue);
    }
}
// If we were to be space efficient, we could do the timeout on array value sorter
// To be time efficient...
// Image this is writing to disk or something
function newNumberSubscriber(numStore, n) {
    numStore.push(n);
}
async function getSorted(numStore, maxChunkSize) {
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
    const sortedArray = [];
    try {
        const iter = readNumbers(numStore);
        while (true) {
            const chunkIterator = manualTake(iter, maxChunkSize);
            // We've filled the chunk. Send it off the work
            const chunk = chunkIterator.toArray();
            if (chunk.length === 0) {
                break;
            }
            const workerPath = path.resolve(__dirname, './sortWorker.js');
            const worker = new node_worker_threads_1.Worker(workerPath);
            // Save the workers to reference later
            workers.push(worker);
            const sortedPromise = new Promise((resolve, reject) => {
                worker.on('message', (m) => {
                    if (m.action === 'sort-chunk')
                        resolve(undefined);
                });
                worker.on('error', reject);
                // worker.on('exit', (code) => {
                //   console.log('exit ', code);
                //   if (code !== 0) {
                //     reject(new Error(`Worker stopped with exit code ${code}`));
                //   }
                // });
            });
            workerPromises.push(sortedPromise);
            // Send the worker some work
            worker.postMessage({
                action: 'sort-chunk',
                data: chunk,
            });
        }
        // Each worker has sorted all chunks
        await Promise.all(workerPromises);
        // console.log('[Main] done sorting');
        // Merge from all workers
        // const mergeCandidates = new MinHeap();
        const mergeCandiates = Array(workers.length).fill(null);
        const resolveList = Array(mergeCandiates.length);
        // Initialize each worker to drop popped values into correct position
        for (let w = 0; w < workers.length; w++) {
            workers[w].on('message', (m) => {
                if (m.action === 'pop-smallest') {
                    mergeCandiates[m.index] = m.data;
                    // Resolve at resolve list
                    // console.log(
                    //   '[Main] received popped: ',
                    //   m.data,
                    //   ' from worker: ',
                    //   m.index
                    // );
                    resolveList[m.index]?.call(undefined);
                    resolveList[m.index] = undefined;
                }
            });
        }
        while (sortedArray.length !== numStore.length) {
            const tickPromises = Array(workers.length);
            // Populate merge candidates
            for (let i = 0; i < mergeCandiates.length; i++) {
                if (mergeCandiates[i] === null) {
                    // console.log(`[Main] queue popp on queue ${i}`);
                    tickPromises[i] = new Promise((resolve, reject) => {
                        resolveList[i] = resolve;
                    });
                    workers[i].postMessage({ action: 'pop-smallest', index: i });
                }
            }
            // Wait for all next numbers to resolve
            await Promise.all(tickPromises.filter((p) => p !== undefined));
            // console.log(`[Main] merge candidates: ${mergeCandiates}`);
            // Push the smallest mergeCandidate to the sorted array
            // Cheat a little here to save time
            // Maybe a min heap structure would be best to have here
            // But we also need to know which worker to pull from so array is fine here
            const [smallest, index] = mergeCandiates
                .map((v, i) => {
                return [v, i];
            })
                .reduce(([prevValue, prevIndex], [cValue, cIndex], i) => {
                if (prevValue === undefined) {
                    return [cValue, cIndex];
                }
                if (cValue < prevValue) {
                    return [cValue, i];
                }
                return [prevValue, prevIndex];
            });
            // console.log(`[Main] pushing ${smallest} to output`);
            mergeCandiates[index] = null;
            sortedArray.push(smallest);
        }
    }
    finally {
        // Gracefully terminate all workers
        await Promise.all(workers.map((w) => w.terminate()));
    }
    return sortedArray;
}
function managerWork(response, resolve, reject) {
    switch (response.action) {
        case 'sort-chunk':
            resolve();
            break;
        case 'pop-smallest':
            break;
        default:
            reject(Error('unknown action'));
    }
}
function* readNumbers(numStore) {
    for (const num of numStore) {
        yield num;
    }
}
function* manualTake(iterator, count) {
    let yieldedCount = 0;
    while (yieldedCount < count) {
        const { value, done } = iterator.next();
        if (done) {
            return; // The original iterator is exhausted, stop yielding.
        }
        yield value; // Yield the element
        yieldedCount++;
    }
}
