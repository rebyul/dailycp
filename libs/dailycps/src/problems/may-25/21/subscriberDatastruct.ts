/**
 * This problem was asked by Twitter.

You are given an array of length 24, where each element represents the number of
new subscribers during the corresponding hour. Implement a data structure that
efficiently supports the following:

update(hour: int, value: int): Increment the element at index hour by value.
query(start: int, end: int): Retrieve the number of subscribers that have signed
up between start and end (inclusive).
You can assume that all values get cleared at the end of the day, and that you
will not be asked for start and end values that wrap around midnight.
*/

import assert = require("node:assert");

export interface ISubscribers {
	update(hour: number, value: number): void;
	query(start: number, end: number): number;
}

export class Subscribers implements ISubscribers {
	constructor(private _hourSubscriber: number[] = new Array(24).fill(0)) {
		assert(_hourSubscriber.length === 24);
	}

	update(hour: number, value: number): void {
		this._hourSubscriber[hour] = value;
	}

	query(start: number, end: number): number {
		return this._hourSubscriber
			.slice(start, end + 1)
			.reduce((a, b) => a + b, 0);
	}
}
