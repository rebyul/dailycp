/**
 * This problem was asked by Amazon.
 *
 * Given a linked list, remove all consecutive nodes that sum to zero. Print out the remaining nodes.
 *
 * For example, suppose you are given the input 3 -> 4 -> -7 -> 5 -> -6 -> 6.
 * In this case, you should first remove 3 -> 4 -> -7, then -6 -> 6, leaving only 5.
 *
 * Lets assume none of the values can equal 0
 */

import { LinkedListNode } from '../../../lib';

export function consecutiveSumZero(
  node: LinkedListNode
): [LinkedListNode[], number[]] {
  if (node.val === 0) {
    throw Error('zero value input');
  }

  const flatNodes = [];
  let flatHead: LinkedListNode | null = node;
  while (flatHead) {
    flatNodes.push(flatHead);
    flatHead = flatHead.next;
  }

  const zeroSumList = [],
    remainderList: number[] = [];
  // Find cycles for each node
  while (flatNodes.length > 0) {
    const currentNode = flatNodes.shift()!;
    const cycleLength = findCycle(currentNode);
    if (cycleLength === 0) {
      remainderList.push(currentNode.val);

      continue;
    } else if (cycleLength !== 0) {
      // new entry in zerosumlist
      zeroSumList.push(currentNode);
      for (let i = 0; i < cycleLength - 1; i++) {
        flatNodes.shift();
      }
      // Chop the tail off at the cycle
      let curr: LinkedListNode = currentNode;
      for (let i = 0; i < cycleLength - 1 && curr.next !== null; i++) {
        curr = curr.next;
      }
      curr.next = null;
    }
  }

  return [zeroSumList, remainderList];
}

export function findCycle(node: LinkedListNode): number {
  let current: LinkedListNode | null = node,
    sum = 0,
    cycleLength = 0;

  while (current) {
    sum += current.val;
    cycleLength++;

    if (sum === 0) {
      // Cut the next pointer in the last entry
      return cycleLength;
    }

    current = current.next;
  }
  return 0;
}

export function arrayToLinkedList(input: number[]) {
  if (input.length === 0) {
    throw Error('no input');
  }

  input.reverse();
  const headValue = input.shift();

  if (headValue === undefined) {
    throw Error('no input');
  }

  let head = new LinkedListNode(headValue);

  while (input.length > 0) {
    const newHead = new LinkedListNode(input.shift()!, head);
    head = newHead;
  }

  return head;
}

export function linkedListToArray(head: LinkedListNode | null): number[] {
  const result = [];
  let current: LinkedListNode | null = head;

  while (current != null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}
