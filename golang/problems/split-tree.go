package problems

import (
	"dailycps/golang/internal/datatypes"
	"errors"
)

/*
*
You are given a tree with an even number of nodes. Consider each connection
between a parent and child node to be an "edge". You would like to remove some
of these edges, such that the disconnected subtrees that remain each have an
even number of nodes.

For example, suppose your input was the following tree:

	  1
	 / \
	2   3
	   / \
	  4   5
	/ | \

6  7  8
In this case, removing the edge (3, 4) satisfies our requirement.

Write a function that returns the maximum number of edges you can remove while
still satisfying this requirement.
*/
func SplitTree[T comparable](tree *datatypes.BinaryTree[T]) ([]Edge[T], error) {
	treeSize := tree.Size()

	if treeSize%2 != 0 {
		return []Edge[T]{}, errors.New("uneven tree size")
	}

	// TODO: This needs to be a list of smallest even splits of the tree node and iterated
	targetSplitSize := treeSize / 2

	// recursively build size map of each node
	subtreeSizeCache := buildSubtreeSizeCache(tree)

	var edgesToRemove = make([]Edge[T], 0)

	// if we find an edge to cut which results in a tree size on the known side
	for node, nodeTreeSize := range subtreeSizeCache {
		// Check if cutting one of the children equals target split size
		// This is what i want to do as cutting one of the children would make this
		// node's size a potential split child
		// If cutting a child
		if nodeTreeSize-1 != targetSplitSize {
			continue
		}

		// We now have a cut that might equal the target split size
		// Choose whether we cut left or right
		leftSize := subtreeSizeCache[node.Left]
		if leftSize-1 == targetSplitSize {
			// this equals an even cut, we return the edge to cut
			edgesToRemove = append(edgesToRemove, Edge[T]{From: node.Value, To: node.Left.Value})
			break
		}

		rightSize := subtreeSizeCache[node.Left]
		if rightSize-1 == targetSplitSize {
			// this equals an even cut, we return the edge to cut
			edgesToRemove = append(edgesToRemove, Edge[T]{From: node.Value, To: node.Left.Value})
			break
		}

	}

	return edgesToRemove, nil
}

type Edge[T comparable] struct {
	From T
	To   T
}

func buildSubtreeSizeCache[T comparable](tree *datatypes.BinaryTree[T]) map[*datatypes.BinaryNode[T]]int {
	sizeMap := make(map[*datatypes.BinaryNode[T]]int)

	if tree == nil {
		return sizeMap
	}

	// dfs down tree to get sizes
	cacheNodeTreeSize(sizeMap, tree.Root)

	return sizeMap
}

func cacheNodeTreeSize[T comparable](sizeMap map[*datatypes.BinaryNode[T]]int, node *datatypes.BinaryNode[T]) int {
	if node == nil {
		return 0
	}

	count := 1
	left := cacheNodeTreeSize(sizeMap, node.Left)
	right := cacheNodeTreeSize(sizeMap, node.Right)

	sizeMap[node] = count + left + right
	return count + left + right
}
