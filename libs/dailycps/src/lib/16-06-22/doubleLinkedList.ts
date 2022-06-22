/**
 * An XOR linked list is a more memory efficient doubly linked list.
 * Instead of each node holding next and prev fields, it holds a field named both,
 * which is an XOR of the next node and the previous node.
 * Implement an XOR linked list; it has an add(element) which adds the element to the end,
 * and a get(index) which returns the node at index.

If using a language that has no pointers (such as Python),
you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.
 */

import { zipWith } from 'lodash';

function add(headAdd: Address, data: any) {
  const newNode: XORElement = { data, bothAdd: NULL_ADDRESS };
  const newNodeAddress = getPointer(newNode);
  newNode.bothAdd = xor(null, newNodeAddress);

  const currenthead = dereferencePointer(headAdd);
  if (currenthead !== null) {
    currenthead.bothAdd = xor(newNodeAddress, currenthead.bothAdd);
  }

  headAdd = newNodeAddress;
}

function get(list: XORElement, index: number) {
  if (!list) return undefined;

  let result: XORElement | undefined = undefined;

  let a = getPointer(list),
    b = list.bothAdd;
  for (let i = 0; i < index; i++) {
    const nextElement = dereferencePointer(xor(a, b));
    result = nextElement;
    a = getPointer(nextElement);
    b = nextElement.bothAdd;
  }
  return result;
}

class XORElement {
  constructor(public data: any, public bothAdd: Address) {}
}

// Dummy string class for addresses
class Address extends String {}

function getPointer(object: XORElement): Address {
  return '';
}

function dereferencePointer(add: Address): XORElement {
  return {} as XORElement;
}

const NULL_ADDRESS = 'x00000000';
function xor(add1: Address | null, add2: Address | null) {
  // if(!add1) return add2
  // assume add1 and 2 are given in 8 length bit strings
  // if (add1.length !== add2.length) throw 'Not addresses';

  const addString = zipWith(
    (add1 || NULL_ADDRESS).substring(1).split(''),
    (add2 || NULL_ADDRESS).substring(1).split(''),
    (a, b) => {
      return a && b ? 0 : 1;
    }
  ).join('');

  return `x${addString}`;
}
