import { IHeap } from './IHeap';

export class MinHeap<T> implements IHeap<T> {
  private heap: T[] = [];
  public length = MinHeap.length;

  constructor(heap: T[] = []) {
    heap.forEach((n) => {
      this.insert(n);
    });
  }

  peek() {
    return this.heap[0];
  }

  insert(item: T) {
    this.heap.push(item);
    this.sortUp(this.heap.length - 1);
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
    this.sortDown(0);
  }

  private sortDown(index: number) {
    if (this.heap.length < 1) {
      return;
    }

    const sortDownValue = this.heap[index];
    let childIndex;

    for (; index * 2 < this.heap.length; index = childIndex) {
      childIndex = index * 2 + 1;

      // Choose the smaller of the two (left, right) children
      if (
        childIndex < this.heap.length - 1 &&
        this.heap[childIndex] > this.heap[childIndex + 1]
      ) {
        childIndex++;
      }

      if (sortDownValue > this.heap[childIndex]) {
        this.heap[index] = this.heap[childIndex];
      } else {
        break;
      }
    }

    this.heap[index] = sortDownValue;
  }

  private sortUp(index: number) {
    if (this.heap.length > 1) {
      for (let i = index; i > 0; i = Math.floor((i - 1) / 2))
        if (this.heap[i] < this.heap[Math.floor((i - 1) / 2)]) {
          [this.heap[Math.floor((i - 1) / 2)], this.heap[i]] = [
            this.heap[i],
            this.heap[Math.floor((i - 1) / 2)],
          ];
        }
    }
  }
}
