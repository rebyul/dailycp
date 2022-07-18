import { MaxHeap } from './MaxHeap';

describe('Max Heap', () => {
  test('Constructor', () => {
    const heap = new MaxHeap<number>([ 5, 12, 11, 13, 4, 6, 7 ]);
    expect(heap).toBeInstanceOf(MaxHeap<number>)
    expect(heap.peek()).toEqual(13)
  });

  test('Insert', () => {
    const heap = new MaxHeap<number>([ 5, 12, 11, 13, 4, 6, 7 ]);
    heap.insert(77);
    expect(heap.peek()).toEqual(77);
  });

  test('Remove', () => {
    const heap = new MaxHeap<number>([ 5, 12, 11, 13, 4, 6, 7 ]);
    heap.remove(13)
    expect(heap.peek()).toEqual(12)
  })
});
