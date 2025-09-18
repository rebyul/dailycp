package problems_test

import (
	"fmt"
	"slices"
	"testing"

	"dailycps/golang/problems"
)

func Test_PowerSet(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected [][]int
	}{
		{
			name:     "empty input",
			input:    []int{},
			expected: [][]int{{}},
		},
		{
			name:     "single value",
			input:    []int{1},
			expected: [][]int{{}, {1}},
		},
		{
			name:     "basic",
			input:    []int{1, 2, 3},
			expected: [][]int{{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}},
		},
	}

	for _, tc := range tests {
		result := problems.CreatePowerSet(tc.input)
		if testArrayEquality(result, tc.expected) == false {
			t.Errorf("[Test failed]: %v, expected: %v, got: %v", tc.name, tc.expected, result)
		} else {
			fmt.Printf("[Test passed]: expected: %v actual: %v\n", tc.expected, result)
		}
	}
}

func testArrayEquality(got [][]int, want [][]int) bool {
	if len(got) != len(want) {
		return false
	}

	for _, w := range want {
		hasW := false
		for _, g := range got {
			if eq := slices.Equal(w, g); eq == true {
				hasW = true
				break
			}
		}

		if hasW == false {
			return false
		}
	}
	return true
}
