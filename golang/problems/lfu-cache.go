package problems

import "errors"

type DoublyLinkedNode[K, T comparable] struct {
	Key   K
	Value T
	Freq  uint
	Prev  *DoublyLinkedNode[K, T]
	Next  *DoublyLinkedNode[K, T]
}

type DoublyLinkedList[K, T comparable] struct {
	Head  *DoublyLinkedNode[K, T]
	Tail  *DoublyLinkedNode[K, T]
	Count uint
}

func (d *DoublyLinkedList[K, T]) AddToHead(node *DoublyLinkedNode[K, T]) {
	if d.Head == nil {
		d.Head = node
		d.Tail = node
	} else {
		d.Head.Prev = node
		node.Next = d.Head
		d.Head = node
	}

	d.Count++
}

func (d *DoublyLinkedList[K, T]) RemoveNode(node *DoublyLinkedNode[K, T]) {
	// If prev is nil, it must be the head
	if node.Prev == nil {
		d.Head = node.Next
	} else {
		node.Next.Prev = node.Prev
	}

	if node.Next == nil {
		d.Tail = node.Prev
	} else {
		node.Next.Prev = node.Prev
	}

	node.Prev = nil
	node.Next = nil
	d.Count--
}

func (d *DoublyLinkedList[K, T]) RemoveTail() (*DoublyLinkedNode[K, T], error) {
	if d.Tail == nil {
		return nil, errors.New("no tail")
	}
	tail := d.Tail

	d.RemoveNode(d.Tail)

	return tail, nil
}
