import { MaxHeap } from './MaxHeap';

describe('Max Heap', () => {
  const array = [5, 12, 11, 13, 4, 6, 7];
  test('Constructor', () => {
    const heap = new MaxHeap<number>(array);
    expect(heap).toBeInstanceOf(MaxHeap<number>)
    expect(heap.peek()).toEqual(13);
    expect(heap.length).toEqual(array.length)
  });

  test('Insert', () => {
    const heap = new MaxHeap<number>(array);
    heap.insert(77);

    expect(heap.peek()).toEqual(77);
    expect(heap.length).toEqual(array.length +1)
  });

  test('Remove', () => {
    const heap = new MaxHeap<number>(array);
    heap.remove(13)
    expect(heap.peek()).toEqual(12)
    expect(heap.length).toBe(array.length-1)
  })

  test('Pop', () => {
    const heap = new MaxHeap<number>(array);
    const poppedItem = heap.pop()
    expect(poppedItem).toEqual(13)
    expect(heap.peek()).toEqual(12)
    expect(heap.length).toEqual(array.length - 1)
  })
});
