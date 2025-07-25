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
			got := tt.list.RemoveTail()

			if got == nil {
				if !tt.wantErr {
					t.Errorf("RemoveTail() failed: %v", nil)
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

func TestLfuCache(t *testing.T) {
	type K string
	type V int

	type getaction struct {
		key     K
		want    V
		wantErr bool
	}

	type setaction struct {
		key   K
		value V
	}

	type cacheaction any

	tests := []struct {
		name     string // description of this test case
		maxCount uint
		actions  []cacheaction
		wantErr  bool
	}{
		{
			name:     "InitLfuCache succeeds with max count >0",
			maxCount: 5,
			wantErr:  false,
		},
		{
			name:     "InitLfuCache fails with max count 0",
			maxCount: 0,
			wantErr:  true,
		},
		{
			name:     "insert one item",
			maxCount: 3,
			wantErr:  false,
			actions: []cacheaction{
				setaction{key: "one", value: 1},
				getaction{key: "one", want: 1, wantErr: false},
			},
		},
		{
			name:     "get non existent item",
			maxCount: 3,
			wantErr:  false,
			actions: []cacheaction{
				setaction{key: "one", value: 1},
				getaction{key: "two", want: 0, wantErr: true},
			},
		},
		{
			name:     "test eviction",
			maxCount: 3,
			wantErr:  false,
			actions: []cacheaction{
				setaction{key: "one", value: 1},
				setaction{key: "two", value: 2},
				setaction{key: "three", value: 3},
				getaction{key: "three", want: 3, wantErr: false},
				setaction{key: "four", value: 4},
				getaction{key: "one", want: 0, wantErr: true},
				getaction{key: "four", want: 4, wantErr: false},
			},
		},
		{
			name:     "test updating keys correctly updates frequency",
			maxCount: 3,
			wantErr:  false,
			actions: []cacheaction{
				setaction{key: "one", value: 1},
				setaction{key: "two", value: 2},
				setaction{key: "three", value: 3},
				getaction{key: "one", want: 1, wantErr: false},
				setaction{key: "one", value: 2},
				getaction{key: "one", want: 2, wantErr: false},
				getaction{key: "two", want: 2, wantErr: false},
				getaction{key: "three", want: 3, wantErr: false},
			},
		},
		{
			name:     "test evict all",
			maxCount: 3,
			wantErr:  false,
			actions: []cacheaction{
				setaction{key: "one", value: 1},
				setaction{key: "two", value: 2},
				setaction{key: "three", value: 3},
				// Check 1,2,3 exists
				getaction{key: "one", want: 1, wantErr: false},
				getaction{key: "two", want: 2, wantErr: false},
				getaction{key: "three", want: 3, wantErr: false},
				// Set 4,5,6
				// Immediately get to increase frequency to 2
				setaction{key: "four", value: 4},
				getaction{key: "four", want: 4, wantErr: false},
				setaction{key: "five", value: 5},
				getaction{key: "five", want: 5, wantErr: false},
				setaction{key: "six", value: 6},
				getaction{key: "six", want: 6, wantErr: false},
				// Check 4,5,6 exists
				getaction{key: "four", want: 4, wantErr: false},
				getaction{key: "five", want: 5, wantErr: false},
				getaction{key: "six", want: 6, wantErr: false},
				// Check 1,2,3 have been evicted
				getaction{key: "one", want: 0, wantErr: true},
				getaction{key: "two", want: 0, wantErr: true},
				getaction{key: "three", want: 0, wantErr: true},
			},
		},
	}

	execActions := func(cache *problems.LfuCache[K, V], a cacheaction) {
		switch v := a.(type) {
		case getaction:
			{
				got, ok := cache.Get(v.key)

				if !ok {
					if !v.wantErr {
						t.Errorf("cache.Get(\"%v\") failed\nList status: %v\n", v.key, cache)
					}
					return
				}

				if v.wantErr {
					t.Fatalf("cache.Get(\"%v\") succeeded unexpectedly\nList status: %v", v.key, cache)
				}

				if got != v.want {
					t.Errorf("cache.Get(\"%v\") = %v, want %v\nList status: %v\n", v.key, got, v.want, cache)
				}
			}
		case setaction:
			{
				cache.Set(v.key, v.value)
			}
		default:
			t.Fatalf("unknown action type: %t", a)
		}
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c, err := problems.InitLfuCache[K, V](tt.maxCount)

			if err != nil && !tt.wantErr {
				t.Errorf("InitLfuCache failed: %v", err)
			}

			for _, a := range tt.actions {
				execActions(c, a)
			}
		})
	}
}
