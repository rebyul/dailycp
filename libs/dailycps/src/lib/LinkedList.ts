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

export function createLinkedList(input: number[]): LinkedList {
  const ll = new LinkedList();
  if (input.length === 0) {
    return ll;
  }

  ll.head = new LinkedListNode(input[0]);

  let curr = ll.head;
  for (const val of input.slice(1)) {
    const newNode = new LinkedListNode(val);
    curr.next = newNode;
    curr = newNode;
  }

  return ll;
}
