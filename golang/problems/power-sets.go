package problems

/*
Good morning! Here's your coding interview problem for today.

This problem was asked by Google.

The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

You may also use a list or array to represent a set.
*/

func CreatePowerSet(nums []int) [][]int {
	var result [][]int

	// Start with the empty set
	result = append(result, []int{})

	// Iterate through each element in the input slice
	for _, num := range nums {
		// Store the current size of the result slice. We'll add new subsets based on
		// these existing ones.
		currentSize := len(result)

		// Iterate through the subsets that existed before adding the current number
		for i := range currentSize {
			// Create a new subset by appending the current number to an existing subset
			newSubset := make([]int, len(result[i]))
			copy(newSubset, result[i])
			newSubset = append(newSubset, num)

			// Append the new subset to the result
			result = append(result, newSubset)
		}
	}

	return result
}
