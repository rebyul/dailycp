"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_worker_threads_1 = require("node:worker_threads");
var primesSmallerThanN_1 = require("./primesSmallerThanN");
function batchGeneratePrimes(start, end) {
    var e_1, _a;
    var primes = new Set();
    console.log('batch from ', start, end);
    // for (let i = start; i <= end; i++) {
    var foundPrimes = (0, primesSmallerThanN_1.findPrimesSmallerThan)(end);
    try {
        for (var foundPrimes_1 = __values(foundPrimes), foundPrimes_1_1 = foundPrimes_1.next(); !foundPrimes_1_1.done; foundPrimes_1_1 = foundPrimes_1.next()) {
            var p = foundPrimes_1_1.value;
            primes.add(p);
            // }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (foundPrimes_1_1 && !foundPrimes_1_1.done && (_a = foundPrimes_1.return)) _a.call(foundPrimes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log('found ', primes.size, 'primes for batch ', start, 'to ', end);
    return __spreadArray([], __read(primes.values()), false);
}
node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.on('message', function (_a) {
    var start = _a.start, end = _a.end;
    var primes = batchGeneratePrimes(start, end);
    node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage(primes);
});
