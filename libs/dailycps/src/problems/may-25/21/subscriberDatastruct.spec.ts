import { ISubscribers, Subscribers } from "./subscriberDatastruct";

describe("Subscriber Data Structure", () => {
	let subscribers: ISubscribers;

	test("Initialize", () => {
		expect(() => {
			subscribers = new Subscribers();
		}).not.toThrow();
	});

	test("Test update single time slot", () => {
		subscribers = new Subscribers();
		subscribers.update(0, 1);
		expect(subscribers.query(0, 0)).toEqual(1);
	});

	test("Test update random time slot", () => {
		const randomTimeIndex = Math.floor(Math.random() * 23);
		subscribers = new Subscribers();
		subscribers.update(randomTimeIndex, 1);
		expect(subscribers.query(randomTimeIndex, randomTimeIndex)).toEqual(1);
	});

	test("Test query over range", () => {
		subscribers = new Subscribers(Array.from({ length: 24 }, (_, i) => i));
		expect(subscribers.query(3, 5)).toEqual(12);
	});
});
