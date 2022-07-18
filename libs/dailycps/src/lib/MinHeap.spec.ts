import { MinHeap } from './MinHeap';

describe('Min heap', () => {
  const array = [5, 12, 11, 13, 4, 6, 7];
  test('Constructor', () => {
    const heap = new MinHeap<number>(array);
    expect(heap).toBeInstanceOf(MinHeap<number>)
    expect(heap.peek()).toEqual(4)
    expect(heap.length).toEqual(array.length)
  });

  test('Insert', () => {
    const heap = new MinHeap<number>(array);
    heap.insert(7);
    expect(heap.peek()).toEqual(4)
    expect(heap.length).toEqual(array.length + 1)

  });

  test('Remove', () => {
    const heap = new MinHeap<number>(array);
    heap.remove(4)
    expect(heap.peek()).toEqual(5)
    expect(heap.length).toEqual(array.length - 1)
  })
});
