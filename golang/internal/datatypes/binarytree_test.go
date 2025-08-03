package datatypes_test

import (
	"dailycps/golang/internal/datatypes"
	"testing"
)

func TestBinaryTree_Size(t *testing.T) {
	type T any
	tests := []struct {
		name string // description of this test case
		tree *datatypes.BinaryTree[T]
		want int
	}{
		{
			name: "empty tree",
			tree: nil,
			want: 0,
		},
		{
			name: "single node",
			tree: &datatypes.BinaryTree[T]{Root: &datatypes.BinaryNode[T]{}},
			want: 1,
		},
		{
			name: "three nodes",
			tree: &datatypes.BinaryTree[T]{Root: &datatypes.BinaryNode[T]{
				Left:  &datatypes.BinaryNode[T]{},
				Right: &datatypes.BinaryNode[T]{},
			}},
			want: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.tree.Size()
			if got != tt.want {
				t.Errorf("Size() = %v, want %v", got, tt.want)
			}
		})
	}
}
