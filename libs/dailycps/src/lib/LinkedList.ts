import { LinkedListNode } from './LinkedListNode';

export class LinkedList {
  constructor(public head: LinkedListNode | null = null) {}

  get length(): number {
    if (this.head === null) {
      return 0;
    }

    let count = 0;
    let curr: LinkedListNode | null = this.head;

    while (curr) {
      curr = curr.next;
      count++;
    }

    return count;
  }
}
