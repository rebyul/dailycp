export interface IHeap<T> {
  length: number;
  peek(): T;
  insert(item: T): void;
  remove(item: T): void;
  pop(): T;
}
