package datatypes

type BinaryTree[T comparable] struct {
	Root *BinaryNode[T]
}

func (b *BinaryTree[T]) Size() int {
	if b == nil {
		return 0
	}
	return countNodes(b.Root)
}

/** Returns size of tree */
func countNodes[T any](b *BinaryNode[T]) int {
	if b == nil {
		return 0
	}

	count := 1
	return count + countNodes(b.Left) + countNodes(b.Right)
}
