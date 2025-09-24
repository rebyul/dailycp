package problems

import (
	"strings"
)

func ShortestStandardizedPath(path string) string {
	if len(path) == 0 {
		return ""
	}

	tokens := strings.Split(path, "/")
	visited := []string{}

	for _, t := range tokens {
		if t == "" || t == "." {
			continue
		}

		if t == ".." {
			if len(visited) > 0 {
				visited = visited[:len(visited)-1]
			}
			continue
		}

		visited = append(visited, t)
	}

	if len(visited) == 0 {
		return "/"
	}

	result := "/" + strings.Join(visited, "/")

	// Add a trailing slash if the original path had one and it's not just the root.
	if len(path) > 1 && path[len(path)-1] == '/' {
		return result + "/"
	}

	return result
}
