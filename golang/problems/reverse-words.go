package problems

import (
	"slices"
	"strings"
)

/**
This problem was asked by Google.

Given a string of words delimited by spaces, reverse the words in string. For example, given "hello world here", return "here world hello"

Follow-up: given a mutable string representation, can you perform this operation in-place?

*/

func ReverseStrings(input string) string {
	tokens := strings.Fields(input)
	slices.Reverse(tokens)
	return strings.Join(tokens, " ")
}
