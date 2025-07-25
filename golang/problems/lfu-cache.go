package problems

import (
	"fmt"
)

type DoublyLinkedNode[K, T comparable] struct {
	Key   K
	Value T
	Freq  uint
	Prev  *DoublyLinkedNode[K, T]
	Next  *DoublyLinkedNode[K, T]
}

func NewDoublyLinkedNode[K, V comparable](key K, value V) *DoublyLinkedNode[K, V] {
	return &DoublyLinkedNode[K, V]{Key: key,
		Value: value,
		Freq:  1,
		Prev:  nil,
		Next:  nil,
	}
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
		node.Prev.Next = node.Next
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

func (d *DoublyLinkedList[K, T]) RemoveTail() *DoublyLinkedNode[K, T] {
	if d.Tail == nil {
		return nil
	}
	tail := d.Tail

	d.RemoveNode(d.Tail)

	return tail
}

/**
 *Implement an LFU (Least Frequently Used) cache. It should be able to be
 initialized with a cache size n, and contain the following methods:

set(key, value): sets key to value. If there are already n items in the cache
and we are adding a new item, then it should also remove the least frequently
used item. If there is a tie, then the least recently used key should be
removed. get(key): gets the value at key. If no such key exists, return null.
*/

type LfuCache[K, V comparable] struct {
	MaxCount uint
	Count    uint
	minFreq  uint
	cache    map[K](*DoublyLinkedNode[K, V])
	freqMap  map[uint64](*DoublyLinkedList[K, V])
}

func InitLfuCache[K, V comparable](maxCount uint) (*LfuCache[K, V], error) {
	if maxCount <= 0 {
		return nil, fmt.Errorf("max count must be greater than 0")
	}

	return &LfuCache[K, V]{
		MaxCount: maxCount,
		minFreq:  0,
		Count:    0,
		cache:    make(map[K](*DoublyLinkedNode[K, V]), maxCount),
		freqMap:  make(map[uint64](*DoublyLinkedList[K, V]), maxCount),
	}, nil
}

func (c *LfuCache[K, V]) Get(key K) (V, bool) {
	v, ok := c.cache[key]

	if !ok {
		var defaultV V
		return defaultV, false
	}

	c.updateFrequency(v)

	return v.Value, true
}

func (c *LfuCache[K, V]) Set(key K, value V) {
	// If it exists override the value
	existing, ok := c.cache[key]
	if ok {
		existing.Value = value
		// Increase frequency
		c.updateFrequency(existing)
		return
	} else {
		// If count >= max, evict lfu node
		if c.Count >= c.MaxCount {
			currentMinFreq := c.freqMap[uint64(c.minFreq)]
			removed := currentMinFreq.RemoveTail()
			if removed != nil {
				delete(c.cache, removed.Key)
				c.Count--
			}
		}

		// Insert if it doesn't exist
		newNode := NewDoublyLinkedNode(key, value)
		// Save new value in cache
		c.cache[key] = newNode
		// new nodes always have freq 1 so add to head of freqMap[1]
		oneFreqMap, ok := c.freqMap[1]
		if !ok {
			oneFreqMap = new(DoublyLinkedList[K, V])
			c.freqMap[1] = oneFreqMap
		}
		oneFreqMap.AddToHead(newNode)
		// Reset minFrequency
		c.minFreq = 1
		// Increase count
		c.Count++
	}
}

func (c *LfuCache[K, V]) updateFrequency(node *DoublyLinkedNode[K, V]) {
	// Find existing freqMap linked list
	freqList := c.freqMap[uint64(node.Freq)]
	// It has to exist. Remove it from the list
	freqList.RemoveNode(node)

	if freqList.Count == 0 && c.minFreq == node.Freq {
		c.minFreq++
	}

	// Increment node freq
	node.Freq++
	// Find freqMap[existing freq +1]
	newFreqList, ok := c.freqMap[uint64(node.Freq)]
	if !ok {
		newFreqList = new(DoublyLinkedList[K, V])
		c.freqMap[uint64(node.Freq)] = newFreqList
	}
	// Add it to the head
	newFreqList.AddToHead(node)
}
