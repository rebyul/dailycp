import { MinHeap } from './MinHeap';

describe('Min heap', () => {
  test('Constructor', () => {
    const heap = new MinHeap<number>([ 5, 12, 11, 13, 4, 6, 7 ]);
    expect(heap).toBeInstanceOf(MinHeap<number>)
    expect(heap.peek()).toEqual(4)
  });

  test('Insert', () => {
    const heap = new MinHeap<number>([ 5, 12, 11, 13, 4, 6, 7 ]);
    heap.insert(7);
    expect(heap.peek()).toEqual(4);
  });

  test('Remove', () => {
    const heap = new MinHeap<number>([ 5, 12, 11, 13, 4, 6, 7 ]);
    heap.remove(4)
    expect(heap.peek()).toEqual(5)
  })
});
