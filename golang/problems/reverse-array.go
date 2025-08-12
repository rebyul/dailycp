package problems

import "errors"

func ReverseArray(input []int) ([]int, error) {
	if len(input) == 0 {
		return nil, ErrEmptyArray
	}

	inputLength := len(input)
	reversed := make([]int, len(input))

	for i, value := range input {
		reversed[inputLength-1-i] = value
	}

	return reversed, nil
}

var ErrEmptyArray = errors.New("empty array")
