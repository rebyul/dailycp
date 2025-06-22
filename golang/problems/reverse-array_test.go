package problems_test

import (
	"dailycps/golang/problems"
	"errors"
	"testing"
)

func TestReverseArray(t *testing.T) {
	input := []int{1, 2, 3}
	expected := []int{3, 2, 1}
	out, err := problems.ReverseArray(input)

	if err != nil {
		t.Errorf(`ReverseArray([]int {1,2,3}) = %q, %v, want []int {3,2,1}`, out, err)
	}
	// Check if the reversed array matches the expected
	if len(out) != len(expected) {
		t.Errorf("ReverseArray(%v) got length %d, want %d. Output: %v", input, len(out), len(expected), out)
		return // Prevent index out of bounds if lengths mismatch
	}

	for i := range out {
		if out[i] != expected[i] {
			t.Errorf("ReverseArray(%v) at index %d: got %d, want %d. Output: %v", input, i, out[i], expected[i], out)
			break
		}
	}
}

func TestReverseEmptyArray(t *testing.T) {
	input := make([]int, 0)
	out, err := problems.ReverseArray(input)

	// As per your requirement, we expect an error for an empty array
	if err == nil {
		t.Errorf("ReverseArray(empty) got err = nil, want an error")
	} else if !errors.Is(err, problems.EmptyArrayError) {
		// Check if the error message is specifically "Empty array"
		t.Errorf("ReverseArray(empty) got unexpected error: %v, want 'Empty array'", err)
	}

	// Ensure the output slice is nil when an error occurs for empty input
	if out != nil {
		t.Errorf("ReverseArray(empty) got out = %v, want nil slice when error occurs", out)
	}
}
