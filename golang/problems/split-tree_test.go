package problems_test

import (
	"testing"

	"dailycps/golang/internal/datatypes"
	"dailycps/golang/problems"
)

func TestSplitTree(t *testing.T) {
	type nodeType = int
	/**
	     1
	   /   \
	  2     3
	       / \
	      4   5
	     / \
	    6   7
	       /
	      8
	*/
	tree := &datatypes.BinaryTree[nodeType]{
		Root: &datatypes.BinaryNode[nodeType]{
			Value: 1,
			Left:  &datatypes.BinaryNode[nodeType]{Value: 2},
			Right: &datatypes.BinaryNode[nodeType]{
				Value: 3,
				Left: &datatypes.BinaryNode[nodeType]{
					Value: 4,
					Left: &datatypes.BinaryNode[nodeType]{
						Value: 6,
					},
					Right: &datatypes.BinaryNode[nodeType]{
						Value: 7,
						Left: &datatypes.BinaryNode[nodeType]{
							Value: 8,
						},
					},
				},
				Right: &datatypes.BinaryNode[nodeType]{Value: 5},
			},
		},
	}

	wanted := map[nodeType]nodeType{3: 4}

	edges, err := problems.SplitTree(tree)
	if err != nil {
		t.Errorf("split tree failed: %v", err)
	}

	for to, from := range wanted {
		// Check if wanted is in edges
		has := false
		for _, e := range edges {
			if e.To == to && e.From == from {
				has = true
				break
			}
		}

		if !has {
			t.Errorf("Expected to: %d, from: %d. Not in result: %v", to, from, edges)
		}
	}

	extraEdges := make([]problems.Edge[nodeType], 0)

	for _, e := range edges {
		to := wanted[e.From]
		if to != e.To {
			extraEdges = append(extraEdges, e)
		}
	}

	if len(extraEdges) != 0 {
		for _, e := range extraEdges {
			t.Errorf("Unexpected edge to: %d, from: %d.", e.From, e.To)
		}
	}
}
