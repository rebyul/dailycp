package problems

import (
	"dailycps/golang/internal/datatypes"
)

type TreeNode struct {
	Value int
	Left  *TreeNode
	Right *TreeNode
}

func PruneTree(root *TreeNode) *TreeNode {
	bfsStack := datatypes.NewStack[*TreeNode]()

	bfsStack.Push(root)

	for !bfsStack.IsEmpty() {
		current, error := bfsStack.Pop()

		if error != nil {
			return root
		}

		if current.Value == 0 {
			return nil
		}

		if current.Left != nil {
			if current.Left.Value == 0 {
				current.Left = nil
			} else {
				bfsStack.Push(current.Left)
			}
		}

		if current.Right != nil {
			if current.Right.Value == 0 {
				current.Right = nil
			} else {
				bfsStack.Push(current.Right)
			}
		}
	}

	return root
}
