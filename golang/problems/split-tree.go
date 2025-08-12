package problems

import (
	"errors"

	"dailycps/golang/internal/datatypes"
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

	// recursively build size map of each node
	nodeSizeMap := buildNodeSizeMap(tree)

	var edgesToRemove = make([]Edge[T], 0)

	toCutList := []*datatypes.BinaryNode[T]{tree.Root}
	for i := 0; i < len(toCutList); i++ {
		current := toCutList[i]
		currentSize := nodeSizeMap[current]

		// try cut left
		if current.Left != nil {
			leftSubSize := nodeSizeMap[current.Left]
			if leftSubSize%2 == 0 {
				nodeSizeMap[current] = currentSize - leftSubSize
				toCutList = append(toCutList, current.Left)
				edgesToRemove = append(edgesToRemove, Edge[T]{From: current.Value, To: current.Left.Value})
			}
		}

		if current.Right != nil {
			// try cut right
			rightSizeSub := nodeSizeMap[current.Right]
			if rightSizeSub%2 == 0 {
				nodeSizeMap[current] = currentSize - rightSizeSub
				toCutList = append(toCutList, current.Right)
				edgesToRemove = append(edgesToRemove, Edge[T]{From: current.Value, To: current.Left.Value})
			}
		}
	}

	return edgesToRemove, nil
}

type Edge[T comparable] struct {
	From T
	To   T
}

func buildNodeSizeMap[T comparable](tree *datatypes.BinaryTree[T]) map[*datatypes.BinaryNode[T]]int {
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
