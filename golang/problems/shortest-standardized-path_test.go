package problems_test

import (
	"testing"

	"dailycps/golang/problems"
)

func TestShortestStandardizedPath(t *testing.T) {
	tests := []struct {
		name  string
		given string
		want  string
	}{{
		name:  "empty path returns empty string",
		given: "",
		want:  "",
	},
		{
			name:  "root path returns root path",
			given: "/",
			want:  "/",
		}, {
			name:  "single path returns single path",
			given: "/usr",
			want:  "/usr",
		},
		{
			name:  "path with . correctly truncates",
			given: "/usr/.",
			want:  "/usr",
		},
		{
			name:  "path with .. correctly traverses up",
			given: "/usr/../test",
			want:  "/test",
		},
		{
			name:  "path begins with .",
			given: "./usr",
			want:  "/usr",
		},
		{
			name:  "path begins with ..",
			given: "../usr",
			want:  "/usr",
		},
		{
			name:  "path ends with .",
			given: "/usr/.",
			want:  "/usr",
		},
		{
			name:  "path ends with ..",
			given: "/usr/..",
			want:  "/",
		},
		{
			name:  "example input",
			given: "/usr/bin/../bin/./scripts/../",
			want:  "/usr/bin/",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := problems.ShortestStandardizedPath(tt.given)

			if got != tt.want {
				t.Errorf("want: %s, got: %s", tt.want, got)
			}
		})
	}
}
