package problems_test

import (
	"dailycps/golang/problems"
	"testing"
)

func TestDoublyLinkList_RemoveTail(t *testing.T) {
	node := &problems.DoublyLinkedNode[string, int]{
		Key:   "one",
		Value: 1,
		Freq:  1,
		Prev:  nil,
		Next:  nil,
	}

	tests := []struct {
		name string // description of this test case
		// Named input parameters for target function.
		list    *problems.DoublyLinkedList[string, int]
		want    *problems.DoublyLinkedNode[string, int]
		wantErr bool
	}{
		{
			name:    "successfully remove tail",
			list:    &(problems.DoublyLinkedList[string, int]{Head: node, Tail: node}),
			want:    node,
			wantErr: false,
		},
		{
			name:    "err on remove from empty list",
			list:    new(problems.DoublyLinkedList[string, int]),
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, gotErr := tt.list.RemoveTail()

			if gotErr != nil {
				if !tt.wantErr {
					t.Errorf("RemoveTail() failed: %v", gotErr)
				}
				return
			}
			if tt.wantErr {
				t.Fatal("RemoveTail() succeeded unexpectedly")
			}
			if node.Value != got.Value || node.Key != got.Key {
				t.Errorf("RemoveTail() = %v, want %v", got.Value, tt.want.Value)
			}
		})
	}
}
