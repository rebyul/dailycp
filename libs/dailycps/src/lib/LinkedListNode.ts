import { inspect, InspectOptions } from 'util';

export class LinkedListNode {
  next: LinkedListNode | null;

  constructor(public val: number, next: LinkedListNode | null = null) {
    this.next = next;
  }

  [inspect.custom](depth: any, options: InspectOptions) {
    return this.val;
  }
}
