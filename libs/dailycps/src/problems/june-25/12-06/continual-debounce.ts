/**
 * This problem was asked by Facebook.

Given a function f, and N return a debounced f of N milliseconds.

That is, as long as the debounced f continues to be invoked, f itself will not
be called for N milliseconds.
*/

// import timersPromises from 'node:timers/promises';

export function continualDebounce<T extends (...args: any) => any>(
  f: T,
  debounce: number
): (args: typeof f.arguments) => Promise<ReturnType<T>> {
  let timeout: NodeJS.Timeout | null = null;

  if (timeout !== null) {
    clearTimeout(timeout);
  }

  const debouncedFn = (args: typeof f.arguments) =>
    new Promise<ReturnType<T>>((resolve) => {
      timeout = setTimeout(() => {
        const res = f.call(undefined, args);
        resolve(res);
      }, debounce);
    });

  return debouncedFn;
}
