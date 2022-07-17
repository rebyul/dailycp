export interface IHeap<T> {
  peek(): T;
  insert(item: T): void;
  remove(item: T): void;
}
