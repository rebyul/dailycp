import { LfuCache } from './lfu';

describe('Least frequently used cache', () => {
  test('negative max size throws error', () => {
    expect(() => new LfuCache<string, number>(-1)).toThrow(
      /max cache size must be > 0/i
    );
  });

  test('set and get value', () => {
    const cache = new LfuCache<string, number>(3);
    const key = 'one',
      value = 1;
    cache.set(key, value);
    const returned = cache.get(key);
    expect(returned).toEqual(value);
  });

  test('remove lfu if full', () => {
    const cache = new LfuCache<string, number>(3);

    cache.set('one', 1);
    cache.set('two', 2);
    cache.set('three', 3);
    const returned = cache.get('one');
    expect(returned).toEqual(1);
    cache.set('four', 4);
    const evicted = cache.get('two');
    expect(evicted).toBeNull();
  });
});
