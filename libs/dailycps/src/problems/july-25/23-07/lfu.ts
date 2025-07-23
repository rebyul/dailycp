/**
 *Implement an LFU (Least Frequently Used) cache. It should be able to be
 initialized with a cache size n, and contain the following methods:

set(key, value): sets key to value. If there are already n items in the cache
and we are adding a new item, then it should also remove the least frequently
used item. If there is a tie, then the least recently used key should be
removed. get(key): gets the value at key. If no such key exists, return null.
 */

class DoublyLinkedListNode<K, V> {
  public key: K;
  public value: V;
  public freq: number;
  public prev: DoublyLinkedListNode<K, V> | null;
  public next: DoublyLinkedListNode<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.freq = 1;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList<K, V> {
  private head: DoublyLinkedListNode<K, V> | null;
  private tail: DoublyLinkedListNode<K, V> | null;
  public size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public addToHead(node: DoublyLinkedListNode<K, V>): void {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  public removeNode(node: DoublyLinkedListNode<K, V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    node.prev = null;
    node.next = null;

    this.size--;
  }

  public removeTail(): DoublyLinkedListNode<K, V> | null {
    if (!this.tail) {
      return null;
    }
    const tailNode = this.tail;
    this.removeNode(tailNode);
    return tailNode;
  }
}

export class LfuCache<K, V> {
  private size: number;
  private minFreq: number;
  private cache: Map<K, DoublyLinkedListNode<K, V>>;
  private freqMap: Map<number, DoublyLinkedList<K, V>>;

  constructor(private maxSize: number) {
    if (maxSize < 0) {
      throw new Error('Max cache size must be > 0');
    }
    this.size = 0;
    this.minFreq = 0;
    this.cache = new Map();
    this.freqMap = new Map();
  }

  get(key: K): V | null {
    const node = this.cache.get(key);

    if (!node) {
      return null;
    }
    this._updateNodeFrequency(node);

    return node.value;
  }

  set(key: K, value: V): void {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      existingNode.value = value;
      this._updateNodeFrequency(existingNode);
    } else {
      // Need to evict if too large
      if (this.size >= this.maxSize) {
        const minFreqList = this.freqMap.get(this.minFreq);
        if (minFreqList) {
          const nodeToEvict = minFreqList.removeTail();
          if (nodeToEvict) {
            this.cache.delete(nodeToEvict.key);
            this.size--;
          }
        }
      }
      const newNode = new DoublyLinkedListNode(key, value);
      this.cache.set(key, newNode);

      let freqOneList = this.freqMap.get(1);
      if (!freqOneList) {
        freqOneList = new DoublyLinkedList();
        this.freqMap.set(1, freqOneList);
      }
      freqOneList.addToHead(newNode);
      this.minFreq = 1; // New inserts always resets the min freq to 1
      this.size++;
    }
  }

  private _updateNodeFrequency(node: DoublyLinkedListNode<K, V>) {
    const existingFreqList = this.freqMap.get(node.freq);

    if (existingFreqList) {
      existingFreqList.removeNode(node);
      if (existingFreqList.size === 0 && this.minFreq === node.freq) {
        this.minFreq++;
      }
    }

    node.freq++;

    let incrementedFreqList = this.freqMap.get(node.freq);
    if (!incrementedFreqList) {
      incrementedFreqList = new DoublyLinkedList();
      this.freqMap.set(node.freq, incrementedFreqList);
    }
    incrementedFreqList.addToHead(node);
  }
}
