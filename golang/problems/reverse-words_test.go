package problems_test

import (
	"dailycps/golang/problems"
	"testing"
)

func TestReverseStrings(t *testing.T) {
	tests := []struct {
		name string // description of this test case
		// Named input parameters for target function.
		input string
		want  string
	}{
		{name: "example",
			input: "hello world here",
			want:  "here world hello",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := problems.ReverseStrings(tt.input)
			if got != tt.want {
				t.Errorf("ReverseStrings() = %v, want %v", got, tt.want)
			}
		})
	}
}
