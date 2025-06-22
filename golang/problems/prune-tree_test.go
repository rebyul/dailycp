package problems_test

import (
	"dailycps/golang/problems"
	"testing"
)

func TestTreeStructure(t *testing.T) {
	leftChild := &problems.TreeNode{
		Value: 2,
		Left:  nil,
		Right: nil,
	}

	input := &problems.TreeNode{
		Value: 1,
		Left:  leftChild,
		Right: nil,
	}

	if input.Value != 1 {
		t.Errorf("Expected input.Value to be %d. Got %d", 1, input.Value)
	}

	if input.Left.Value != 2 {
		t.Errorf("Expected input.Left.Value to be %d. Got %d", 2, input.Left.Value)
	}

	if input.Right != nil {
		t.Errorf("Expected input.Right to be nil. Got %v", input.Right)
	}
}

func TestPruneTree(t *testing.T) {
	leftChild := &problems.TreeNode{
		Value: 2,
		Left:  nil,
		Right: nil,
	}

	rightLeftChild := &problems.TreeNode{
		Value: 0,
		Left:  nil,
		Right: nil,
	}

	rightRightChild := &problems.TreeNode{
		Value: 0,
		Left:  nil,
		Right: nil,
	}

	rightChild := &problems.TreeNode{
		Value: 3,
		Left:  rightLeftChild,
		Right: rightRightChild,
	}

	input := &problems.TreeNode{
		Value: 1,
		Left:  leftChild,
		Right: rightChild,
	}

	if input.Value != 1 {
		t.Errorf("Expected input.Value to be %d. Got %d", 1, input.Value)
	}

	if input.Left.Value != 2 {
		t.Errorf("Expected input.Left.Value to be %d. Got %d", 2, input.Left.Value)
	}

	if input.Right.Value != 3 {
		t.Errorf("Expected input.Right to be nil. Got %v", input.Right)
	}

	if input.Right.Left == nil {
		t.Errorf("Expected input.Right.Left not to be nil. Got %v", input.Right.Left)
	}

	if input.Right.Right == nil {
		t.Errorf("Expected input.Right.Right not to be nil. Got %v", input.Right.Right)
	}

	newRoot := problems.PruneTree(input)

	if newRoot.Value != 1 {
		t.Errorf("Expected newRoot.Value to be %d. Got %d", 1, newRoot.Value)
	}

	if newRoot.Left.Value != 2 {
		t.Errorf("Expected newRoot.Left.Value to be %d. Got %d", 2, newRoot.Left.Value)
	}

	if newRoot.Right.Value != 3 {
		t.Errorf("Expected newRoot.Right to be nil. Got %v", newRoot.Right)
	}

	if newRoot.Right.Left != nil {
		t.Errorf("Expected newRoot.Right.Left to be nil. Got %v", newRoot.Right.Left)
	}
	if newRoot.Right.Right != nil {
		t.Errorf("Expected newRoot.Right.Right to be nil. Got %v", newRoot.Right.Right)
	}
}

func TestRootPruning(t *testing.T) {
	leftChild := &problems.TreeNode{
		Value: 2,
		Left:  nil,
		Right: nil,
	}

	rightChild := &problems.TreeNode{
		Value: 3,
		Left:  nil,
		Right: nil,
	}

	input := &problems.TreeNode{
		Value: 0,
		Left:  leftChild,
		Right: rightChild,
	}

	if input.Value != 0 {
		t.Errorf("Expected input.Value to be %d. Got %d", 1, input.Value)
	}

	if input.Left.Value != 2 {
		t.Errorf("Expected input.Left.Value to be %d. Got %d", 2, input.Left.Value)
	}

	if input.Right.Value != 3 {
		t.Errorf("Expected input.Right to be nil. Got %v", input.Right)
	}

	newRoot := problems.PruneTree(input)

	if newRoot != nil {
		t.Errorf("Expected newRoot to be nil. Got %v", newRoot)
	}
}
