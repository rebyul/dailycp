package problems_test

import (
	"testing"

	"dailycps/golang/internal/datatypes"
	"dailycps/golang/problems"
)

func TestSplitTree(t *testing.T) {
	tree := &datatypes.BinaryTree[int]{
		Root: &datatypes.BinaryNode[int]{
			Value: 1,
			Left:  &datatypes.BinaryNode[int]{Value: 2},
			Right: &datatypes.BinaryNode[int]{
				Value: 3,
				Left: &datatypes.BinaryNode[int]{
					Value: 4,
					Left: &datatypes.BinaryNode[int]{
						Value: 6,
					},
					Right: &datatypes.BinaryNode[int]{
						Value: 7,
						Left: &datatypes.BinaryNode[int]{
							Value: 8,
						},
					},
				},
				Right: &datatypes.BinaryNode[int]{Value: 5},
			},
		},
	}

	wanted := map[int]int{3: 4}

	edges, err := problems.SplitTree(tree)
	if err != nil {
		t.Errorf("split tree failed: %v", err)
	}

	for _, e := range edges {
		to := wanted[e.From]
		if to != e.To {
			t.Errorf("Could not find edge from %d to %d", e.From, e.To)
		}
	}
}
