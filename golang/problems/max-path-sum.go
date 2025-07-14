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

func AdjPathSum[T Addable](node *datatypes.BinaryNode[T]) {
	size := treeSize(node)
	// Create empty map?
	adjMap := (make(map[datatypes.BinaryNode[T]][]datatypes.BinaryNode[T], size))

	populateAdjacencyTree(*node, &adjMap)
	// fmt.Println(adjMap)

	// for n, edges := range adjMap {
	//
	// }
}

func populateAdjacencyTree[T Addable](node datatypes.BinaryNode[T], adjMap *map[datatypes.BinaryNode[T]][]datatypes.BinaryNode[T]) {
	// dfs node tree and add node to adj map
	if _, ok := (*adjMap)[node]; !ok {
		(*adjMap)[node] = make([]datatypes.BinaryNode[T], 0, 2)
	}

	if node.Left != nil {
		(*adjMap)[node] = append((*adjMap)[node], *node.Left)
		populateAdjacencyTree(*node.Left, adjMap)
	}

	if node.Right != nil {
		(*adjMap)[node] = append((*adjMap)[node], *node.Right)
		populateAdjacencyTree(*node.Right, adjMap)
	}
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
