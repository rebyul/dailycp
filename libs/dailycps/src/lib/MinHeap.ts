import { IHeap } from './IHeap';

export class MinHeap<T> implements IHeap<T> {
  private heap: T[] = [];

  constructor(heap: T[] = []) {
    this.heap = heap;
    console.log(
      '🚀 ~ file: MinHeap.ts ~ line 8 ~ MinHeap<T> ~ constructor ~ this.heap',
      this.heap
    );
    this.heapify();
    console.log(
      '🚀 ~ file: MinHeap.ts ~ line 8 ~ MinHeap<T> ~ constructor ~ this.heap',
      this.heap
    );
  }

  peek() {
    return this.heap[0];
  }

  insert(item: T) {
    this.heap.push(item);
    this.heapify();
    // console.log(this.heap);
  }

  remove(item: T) {
    const itemIndex = this.heap.indexOf(item);

    if (itemIndex === -1) {
      throw new Error(`${item} not in heap`);
    }

    // Swap the position of the last item and to delete item
    [this.heap[itemIndex], this.heap[this.heap.length - 1]] = [
      this.heap[this.heap.length - 1],
      this.heap[itemIndex],
    ];

    // Remove last item
    this.heap.splice(this.heap.length - 1, 1);

    // Restore min heap property
    this.heapify();
  }

  private heapify() {
    if (this.heap.length > 0) {
      let currentIndex = this.heap.length - 1,
        parentIndex = Math.floor((currentIndex - 1) / 2);

      while (
        currentIndex > 0 &&
        this.heap[parentIndex] > this.heap[currentIndex]
      ) {
        [this.heap[parentIndex], this.heap[currentIndex]] = [
          this.heap[currentIndex],
          this.heap[parentIndex],
        ];
        currentIndex = parentIndex;
        parentIndex = Math.floor((currentIndex - 1) / 2);
      }
    }
  }
}

[0, 1, 2, 3, 4, 5, 6];
