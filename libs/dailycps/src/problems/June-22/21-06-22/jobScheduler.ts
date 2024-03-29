/**
 * Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
 */

function scheduleJob(func: () => void, delay: number) {
  setTimeout(() => func.call(undefined), delay);
}
