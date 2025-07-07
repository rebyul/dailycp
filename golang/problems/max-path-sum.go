package problems

import (
	"dailycps/golang/internal/datatypes"
)

/**
This problem was asked by Google.

Given a binary tree of integers, find the maximum path sum between two nodes.
The path must go through at least one node, and does not need to go through the
root.
*/

type Addable interface {
	~int | ~int16 | ~int32 | ~int64 |
		~uint | ~uint16 | ~uint32 | ~uint64
}

func MaxPathSum[T Addable](node *datatypes.BinaryNode[T]) []T {
	if node == nil {
		return make([]T, 0)
	}

	var currMaxPath []T

	// Tree by itself
	singlePath := []T{node.Value}
	rootPath := make([]T, 0, 3)
	rootPath = append(rootPath, node.Value)
	if node.Left != nil {
		rootPath = append(rootPath, node.Left.Value)
	}
	if node.Right != nil {
		rootPath = append(rootPath, node.Right.Value)
	}

	if sliceSum(singlePath) > sliceSum(rootPath) {
		currMaxPath = []T{node.Value}
	} else {
		currMaxPath = rootPath
	}

	leftPath := MaxPathSum(node.Left)
	rightPath := MaxPathSum(node.Right)

	if sliceSum(currMaxPath) < sliceSum(leftPath) {
		currMaxPath = leftPath
	}
	if sliceSum(currMaxPath) < sliceSum(rightPath) {
		currMaxPath = rightPath
	}

	return currMaxPath
}

func createAdjacencyTree[T Addable](node datatypes.BinaryNode[T]) map[datatypes.BinaryNode[T]]datatypes.BinaryNode[T] {
	// Create empty map?
	adjMap := make(map[datatypes.BinaryNode[T]]datatypes.BinaryNode[T])

	// nodeStack :=
	return adjMap
}

func treeSize[T any](node *datatypes.BinaryNode[T]) int {
	if node == nil {
		return 0
	}

	return 1 + treeSize(node.Left) + treeSize(node.Right)
}

func sliceSum[T Addable](slice []T) T {
	var sum T
	for _, v := range slice {
		sum += v
	}

	return sum
}
