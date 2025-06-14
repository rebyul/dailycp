export class LinkedListNode {
  next: LinkedListNode | null;

  constructor(public val: number, next: LinkedListNode | null = null) {
    this.next = next;
  }
}
