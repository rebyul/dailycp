import { LinkedListNode } from '../../../lib';
import {
  arrayToLinkedList,
  consecutiveSumZero,
  findCycle,
  linkedListToArray,
} from './consecutive-sum-zero';

describe('Consecutive sum zero', () => {
  it('Test creating linked list', () => {
    const input = [3, 4, -7, 5, -6, 6];

    const result = arrayToLinkedList(input);

    expect(result).not.toBeNull();
    expect(result.val).toEqual(3);
    expect(result.next?.val).toEqual(4);
    expect(result.next?.next?.val).toEqual(-7);
    expect(result.next?.next?.next?.val).toEqual(5);
    expect(result.next?.next?.next?.next?.val).toEqual(-6);
    expect(result.next?.next?.next?.next?.next?.val).toEqual(6);
  });

  it('Test linked list to array', () => {
    const input = new LinkedListNode(
      3,
      new LinkedListNode(
        4,
        new LinkedListNode(
          -7,
          new LinkedListNode(5, new LinkedListNode(-6, new LinkedListNode(6)))
        )
      )
    );

    const result = linkedListToArray(input);
    expect(result.length).toEqual(6);
    expect(result).toStrictEqual([3, 4, -7, 5, -6, 6]);
  });

  it('Test find cycle', () => {
    const input = arrayToLinkedList([3, -3, 5]);
    const res = findCycle(input);
    expect(res).toEqual(2);
  });

  it('Simple cycle only', () => {
    const input = arrayToLinkedList([3, -3]);
    const [zeroSumLists, remainders] = consecutiveSumZero(input);
    expect(linkedListToArray(zeroSumLists[0])).toEqual([3, -3]);
    expect(remainders).toEqual([]);
  });

  it('Remainder at end', () => {
    const input = arrayToLinkedList([3, -3, 5]);
    const [zeroSumLists, remainders] = consecutiveSumZero(input);
    expect(linkedListToArray(zeroSumLists[0])).toEqual([3, -3]);
    expect(remainders).toEqual([5]);
  });

  it('Remainder at start', () => {
    const input = arrayToLinkedList([5, -3, 3]);
    const [zeroSumLists, remainders] = consecutiveSumZero(input);
    expect(linkedListToArray(zeroSumLists[0])).toEqual([-3, 3]);
    expect(remainders).toEqual([5]);
  });

  it('Sample input', () => {
    const input = new LinkedListNode(
      3,
      new LinkedListNode(
        4,
        new LinkedListNode(
          -7,
          new LinkedListNode(5, new LinkedListNode(-6, new LinkedListNode(6)))
        )
      )
    );
    const [zeroSumLists, remainders] = consecutiveSumZero(input);
    expect(linkedListToArray(zeroSumLists[0])).toEqual([3, 4, -7]);
    expect(linkedListToArray(zeroSumLists[1])).toEqual([-6, 6]);
    expect(remainders).toEqual([5]);
  });
});
