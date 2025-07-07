package problems_test

import (
	"dailycps/golang/internal/datatypes"
	"dailycps/golang/problems"
	"fmt"
	"slices"
	"testing"
)

type testcase[T problems.Addable] struct {
	root     *datatypes.BinaryNode[T]
	expected []T
}

func TestMaxPathSum(t *testing.T) {
	root1 := &datatypes.BinaryNode[int]{Value: -2}
	root1.Left = &datatypes.BinaryNode[int]{Value: 2}
	root1.Right = &datatypes.BinaryNode[int]{Value: 1}

	root2 := &datatypes.BinaryNode[int]{Value: -10}
	root2.Left = &datatypes.BinaryNode[int]{Value: 9}
	root2.Right = &datatypes.BinaryNode[int]{Value: 20}
	root2.Right.Left = &datatypes.BinaryNode[int]{Value: 15}
	root2.Right.Left.Left = &datatypes.BinaryNode[int]{Value: -5}
	root2.Right.Right = &datatypes.BinaryNode[int]{Value: 7}

	testCases := []testcase[int]{
		{root1, []int{2}},
		{root2, []int{15, 20, 7}},
	}

	fmt.Printf("[Start test] %d test cases\n", len(testCases))
	passed, failed := 0, 0
	for _, tc := range testCases {
		if execTest(t, tc) {
			passed++
		} else {
			failed++
		}
	}

	fmt.Printf("[End test] %d passed, %d failed\n", passed, failed)
}

func execTest[T problems.Addable](t *testing.T, tc testcase[T]) bool {
	result := problems.MaxPathSum[T](tc.root)

	expectedLen, resultLen := len(tc.expected), len(result)
	if expectedLen != resultLen {
		t.Errorf("[Test failed] Length mismatch: expected: %v actual: %v\n", tc.expected, result)
		return false
	}

	expectedSum, resultSum := sliceSum(tc.expected), sliceSum(result)

	if expectedSum != resultSum {
		t.Errorf("[Test failed] Sum mismatch: expected: %v actual: %v\n", tc.expected, result)
	}

	for _, v := range result {
		if !slices.ContainsFunc(tc.expected, func(e T) bool {
			if e == v {
				return true
			}

			return false
		}) {
			t.Errorf("[Test failed] Missing value: expected: %v actual: %v\n", tc.expected, result)
			return false
		}
	}

	fmt.Printf("[Test passed]: expected: %v actual: %v\n", tc.expected, result)
	return true
}

func sliceSum[T problems.Addable](slice []T) T {
	var sum T

	for _, v := range slice {
		sum += v
	}

	return sum
}
