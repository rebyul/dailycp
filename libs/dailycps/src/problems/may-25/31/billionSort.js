"use strict";
/**
 * This problem was asked by Amazon.

Given an array of a million integers between zero and a billion, out of order,
h ow can you efficiently sort it? Assume that you cannot store an array of a
billion elements in memory.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genNumber = genNumber;
exports.genNumbers = genNumbers;
exports.newNumberSubscriber = newNumberSubscriber;
exports.getSorted = getSorted;
var node_worker_threads_1 = require("node:worker_threads");
var path = require("node:path");
// Randomly generate a number
function genNumber(maxValue) {
    return Math.floor(Math.random() * maxValue);
}
function genNumbers(count, maxValue) {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < count)) return [3 /*break*/, 4];
                return [4 /*yield*/, genNumber(maxValue)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
// If we were to be space efficient, we could do the timeout on array value sorter
// To be time efficient...
// Image this is writing to disk or something
function newNumberSubscriber(numStore, n) {
    numStore.push(n);
}
function getSorted(numStore, maxChunkSize) {
    return __awaiter(this, void 0, void 0, function () {
        function managerWork(m
        // resolve: (args?: any) => void,
        // reject: (error: Error) => void
        ) {
            var _a, _b;
            switch (m.action) {
                case 'sort-chunk':
                    console.log('resolve sort:', m.index);
                    (_a = sortResolves_1[m.index]) === null || _a === void 0 ? void 0 : _a.call(undefined, undefined);
                    Promise.resolve(Promise.resolve(workerPromises[m.index]));
                    break;
                case 'pop-smallest':
                    console.log('popped smallest: ', m.data);
                    mergeCandiates_1[m.index] = m.data;
                    // Resolve at resolve list
                    console.log('resolved ', m.index);
                    (_b = resolveList_1[m.index]) === null || _b === void 0 ? void 0 : _b.call(undefined);
                    resolveList_1[m.index] = undefined;
                    break;
                default:
                    throw new Error('unknown action');
            }
        }
        var workers, workerPromises, sortedArray, iter, sortResolves_1, _loop_1, state_1, mergeCandiates_1, resolveList_1, w, tickPromises, _loop_2, i, _a, smallest, index;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Safe to assume that if the list is shorter than the num of workers
                    // we can sort in memory
                    if (numStore.length < maxChunkSize) {
                        return [2 /*return*/, numStore.sort()];
                    }
                    workers = [];
                    workerPromises = [];
                    sortedArray = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 6, 8]);
                    iter = readNumbers(numStore);
                    sortResolves_1 = [];
                    _loop_1 = function () {
                        var chunkIterator = iter.take(maxChunkSize);
                        // We've filled the chunk. Send it off the work
                        var chunk = chunkIterator.toArray();
                        if (chunk.length === 0) {
                            return "break";
                        }
                        var workerPath = path.resolve(__dirname, './sortWorker.js');
                        console.log("[Main] Worker script path: ".concat(workerPath));
                        var worker = new node_worker_threads_1.Worker(workerPath);
                        // Save the workers to reference later
                        var workerIndex = workers.push(worker) - 1;
                        worker.on('message', function (m) {
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
                        console.log("Created worker ".concat(workerIndex));
                        var sortedPromise = new Promise(function (resolve, reject) {
                            sortResolves_1[workerIndex] = resolve;
                        });
                        workerPromises.push(sortedPromise);
                        console.log('post sort', workerIndex);
                        // Send the worker sort work
                        worker.postMessage({
                            action: 'sort-chunk',
                            data: chunk,
                            index: workerIndex,
                        });
                    };
                    while (true) {
                        state_1 = _loop_1();
                        if (state_1 === "break")
                            break;
                    }
                    // Each worker has sorted all chunks
                    console.log('meow', workerPromises);
                    return [4 /*yield*/, Promise.all(workerPromises)];
                case 2:
                    _b.sent();
                    console.log('woof', workerPromises);
                    mergeCandiates_1 = Array(workers.length);
                    resolveList_1 = Array(mergeCandiates_1.length);
                    // Merge from all workers
                    // const mergeCandidates = new MinHeap()
                    // const mergeCandiates = Array(workers.length);
                    //
                    // const resolveList: ((() => void) | undefined)[] = Array(
                    //   mergeCandiates.length
                    // );
                    // Initialize each worker to drop popped values into correct position
                    for (w = 0; w < workers.length; w++) {
                        workers[w].on('message', function (m) {
                            var _a;
                            if (m.action === 'pop-smallest') {
                                mergeCandiates_1[m.index] = m.data;
                                // Resolve at resolve list
                                console.log('resolved ', m.index);
                                (_a = resolveList_1[m.index]) === null || _a === void 0 ? void 0 : _a.call(undefined);
                                resolveList_1[m.index] = undefined;
                            }
                        });
                    }
                    _b.label = 3;
                case 3:
                    if (!(sortedArray.length !== numStore.length)) return [3 /*break*/, 5];
                    tickPromises = Array(workers.length);
                    _loop_2 = function (i) {
                        if (mergeCandiates_1[i] === undefined) {
                            tickPromises[i] = new Promise(function (resolve, reject) {
                                resolveList_1[i] = resolve;
                            });
                            workers[i].postMessage({ action: 'pop-smallest', index: i });
                        }
                    };
                    // Populate merge candidates
                    for (i = 0; i < mergeCandiates_1.length; i++) {
                        _loop_2(i);
                    }
                    // Wait for all next numbers to resolve
                    return [4 /*yield*/, Promise.all(tickPromises.filter(function (p) { return p !== undefined; }))];
                case 4:
                    // Wait for all next numbers to resolve
                    _b.sent();
                    _a = mergeCandiates_1
                        .map(function (v, i) {
                        return [v, i];
                    })
                        .reduce(function (_a, _b, i) {
                        var aValue = _a[0], aIndex = _a[1];
                        var cValue = _b[0], cIndex = _b[1];
                        if (cValue === undefined) {
                            return [aValue, aIndex];
                        }
                        if (cValue < aValue) {
                            return [cValue, i];
                        }
                        return [aValue, aIndex];
                    }), smallest = _a[0], index = _a[1];
                    console.log('[', smallest, ',', index, ']');
                    mergeCandiates_1[index] = undefined;
                    sortedArray.push(smallest);
                    return [3 /*break*/, 3];
                case 5: return [3 /*break*/, 8];
                case 6: 
                // Gracefully terminate all workers
                return [4 /*yield*/, Promise.all(workers.map(function (w) { return w.terminate(); }))];
                case 7:
                    // Gracefully terminate all workers
                    _b.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, sortedArray];
            }
        });
    });
}
function readNumbers(numStore) {
    var _i, numStore_1, num;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, numStore_1 = numStore;
                _a.label = 1;
            case 1:
                if (!(_i < numStore_1.length)) return [3 /*break*/, 4];
                num = numStore_1[_i];
                return [4 /*yield*/, num];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
