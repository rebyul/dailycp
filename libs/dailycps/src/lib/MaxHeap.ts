import { IHeap } from './IHeap';

export class MaxHeap<T> implements IHeap<T> {
  private heap: T[] = [];
  public length: number = this.heap.length;

  constructor(array: T[]) {
    array.forEach((element) => {
      this.insert(element);
    });
  }

  peek(): T {
    return this.heap[0];
  }

  insert(item: T): void {
    const itemIndex = this.heap.push(item);
    this.sortUp(itemIndex - 1);
  }

  remove(item: T): void {
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

  private sortUp(index: number) {
    if (this.heap.length < 1) {
      return;
    }
    for (let i = index; i > 0; i = Math.floor((i - 1) / 2)) {
      // If the parent is smaller than the current item, swap
      if (this.heap[Math.floor((i - 1) / 2)] < this.heap[i]) {
        [this.heap[Math.floor((i - 1) / 2)], this.heap[i]] = [
          this.heap[i],
          this.heap[Math.floor((i - 1) / 2)],
        ];
      } else {
        break;
      }
    }
  }

  private sortDown(index: number) {
    if (this.heap.length < 1) {
      return;
    }
    const sortDownValue = this.heap[index];
    let childIndex: number;
    for (; index * 2 < this.heap.length; index = childIndex) {
      childIndex = index * 2 + 1;
      // Pick larger between left and right children
      if (this.heap[childIndex] < this.heap[childIndex + 1]) {
        childIndex++;
      }
      if (sortDownValue < this.heap[childIndex]) {
        this.heap[index] = this.heap[childIndex];
      } else {
        break;
      }
    }

    this.heap[index] = sortDownValue;
  }
}
