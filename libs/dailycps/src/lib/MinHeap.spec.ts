import { MinHeap } from './MinHeap';

describe('Min heap', () => {
  test('Constructor', () => {
    const heap = new MinHeap<number>([5,3,6]);
    expect(heap).toBeInstanceOf(MinHeap<number>)
    expect(heap.peek()).toEqual(3)
  });

  // test('Insert', () => {
  //   const heap = new MinHeap<number>([5, 3, 6]);
  //   heap.insert(7);
  //   expect(heap.peek()).toEqual(3);
  // });
});
