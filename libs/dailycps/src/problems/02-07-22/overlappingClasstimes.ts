/**
 * This problem was asked by Snapchat.

Given an array of time intervals (start, end) for classroom lectures (possibly overlapping),
find the minimum number of rooms required.

For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
Time complexity: O(n) where n is the number of class times
Space complexity: O(n) where n is the number of class times
 */
export function noOfClassrooms(times: number[][]) {
  let classrooms = 0;

  // Set of 5 minute intervals a lecture has been scheduled in
  const scheduled = new Set<number>();

  times.forEach((lecture) => {
    const [start, end] = lecture;

    // if clash, increase classrooms
    if (findClash(scheduled, start, end)) {
      classrooms++;
    }

    // schedule lecture
    for (let i = start; i < end; i = i + 5) {
      scheduled.add(i);
    }
  });

  return classrooms;
}

function findClash(scheduled: Set<number>, start: number, end: number) {
  return scheduled.has(start) || scheduled.has(end);
}
