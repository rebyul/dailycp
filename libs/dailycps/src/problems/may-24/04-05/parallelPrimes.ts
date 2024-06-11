import { Worker } from 'node:worker_threads';

const numThreads = 4; // Number of worker threads
const range = 100000; // Range of numbers to check for primes
const chunkSize = Math.ceil(range / numThreads);

function runWorker(start: number, end: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./primeWorker.js');
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
    worker.postMessage({ start, end });
  });
}

async function findPrimes() {
  const promises = [];
  for (let i = 0; i < numThreads; i++) {
    const start = i * chunkSize + 1;
    const end = (i + 1) * chunkSize;
    promises.push(runWorker(start, end));
  }

  const results = await Promise.all(promises);
  const primes = results.flat();
  console.log('Primes:', primes, 'total ', primes.length);
}

findPrimes().catch((err) => console.error(err));
