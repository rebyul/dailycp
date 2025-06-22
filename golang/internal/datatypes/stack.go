package datatypes

import "errors"

// Stack represents a generic stack data structure.
// It uses a slice as its underlying storage.
type Stack[T any] struct {
	elements []T
}

// NewStack creates and returns a pointer to a new empty Stack.
func NewStack[T any]() *Stack[T] {
	return &Stack[T]{
		elements: make([]T, 0), // Initialize with an empty slice
	}
}

// Push adds an element to the top of the stack.
func (s *Stack[T]) Push(item T) {
	s.elements = append(s.elements, item)
}

// Pop removes and returns the top element from the stack.
// It returns an error if the stack is empty.
func (s *Stack[T]) Pop() (T, error) {
	if s.IsEmpty() {
		var zeroValue T // Get the zero value for type T
		return zeroValue, errors.New("stack is empty, cannot pop")
	}
	// Get the last element
	lastIndex := len(s.elements) - 1
	item := s.elements[lastIndex]
	// Remove the last element
	s.elements = s.elements[:lastIndex]
	return item, nil
}

// Peek returns the top element of the stack without removing it.
// It returns an error if the stack is empty.
func (s *Stack[T]) Peek() (T, error) {
	if s.IsEmpty() {
		var zeroValue T
		return zeroValue, errors.New("stack is empty, cannot peek")
	}
	return s.elements[len(s.elements)-1], nil
}

// IsEmpty returns true if the stack contains no elements.
func (s *Stack[T]) IsEmpty() bool {
	return len(s.elements) == 0
}

// Size returns the number of elements in the stack.
func (s *Stack[T]) Size() int {
	return len(s.elements)
}
