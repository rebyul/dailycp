import { inspect, InspectOptions } from 'util';

/**
 * Doubly linked list for numbers. Assumes there are no duplicate values
 */
export class DoublyLinkedList {
  head: DoublyLinkedListNode | null = null;
  tail: DoublyLinkedListNode | null = null;
  constructor(initial: DoublyLinkedListNode | null = null) {
    if (initial !== null) {
      if (DoublyLinkedListNode.isNode(initial)) {
        this._appendNode(initial);
      } else {
        this.append(initial);
      }
    }
  }

  get length(): number {
    let len = 0;
    let curr = this.head;
    while (curr !== null) {
      len++;
      curr = curr.next;
    }

    return len;
  }
  append(val: number) {
    const node = new DoublyLinkedListNode(val);
    this._appendNode(node);
  }

  private _appendNode(node: DoublyLinkedListNode) {
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  /**
   * Will remove the first instance of the matched node
   */
  remove(val: number) {
    if (!this.head) {
      return;
    }

    let curr: DoublyLinkedListNode | null = this.head;

    while (curr !== null) {
      if (curr.val !== val) {
        curr = curr.next;
      } else if (curr.val === val) {
        if (curr.prev !== null) {
          curr.prev.next = curr.next;
        } else {
          this.head = curr.next;
        }

        if (curr.next !== null) {
          curr.next.prev = curr.prev;
        } else {
          this.tail = curr.prev;
        }

        curr.prev = null;
        curr.next = null;
        curr = null;
      }
    }
  }

  // Returns an array of the node values – used for debugging
  toArray() {
    const values = [];
    let node = this.head;
    while (node) {
      values.push(node.val);
      node = node.next;
    }
    return values;
  }

  // Node.js custom inspect hook
  // when Jest runs util.inspect on the list, this is called. return a plain array so that the test name shows the values.
  [inspect.custom](_depth: any, _options: InspectOptions) {
    return this.toArray();
  }
}

export function createDoublyLinkedList(input: number[]) {
  const result = new DoublyLinkedList();

  if (input.length === 0) {
    return result;
  }

  for (const v of input) {
    result.append(v);
  }

  return result;
}

export class DoublyLinkedListNode {
  constructor(
    public val: number,
    public prev: DoublyLinkedListNode | null = null,
    public next: DoublyLinkedListNode | null = null
  ) {}

  static isNode(val: any): val is DoublyLinkedListNode {
    return val instanceof DoublyLinkedListNode;
  }
}
