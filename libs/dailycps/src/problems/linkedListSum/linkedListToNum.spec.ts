import { ListNode, addTwoNumbers } from './linkedListSum';

describe('listToNum', () => {
  test.each([
    {
      l1: new ListNode(2, new ListNode(4, new ListNode(3))),
      l2: new ListNode(5, new ListNode(6, new ListNode(4))),
      output: new ListNode(7, new ListNode(0, new ListNode(8))),
    },
    { l1: new ListNode(0), l2: new ListNode(0), output: new ListNode(0) },
    {
      l1: new ListNode(
        9,
        new ListNode(
          9,
          new ListNode(
            9,
            new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))
          )
        )
      ),
      l2: new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
      output: new ListNode(
        8,
        new ListNode(
          9,
          new ListNode(
            9,
            new ListNode(
              9,
              new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1))))
            )
          )
        )
      ),
    },
    {
      l1: new ListNode(1, new ListNode(0, new ListNode(9))),
      l2: new ListNode(5, new ListNode(7, new ListNode(8))),
      output: new ListNode(
        6,
        new ListNode(7, new ListNode(7, new ListNode(1)))
      ),
    },
    {
      l1: new ListNode(
        1,
        new ListNode(
          0,
          new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1))))
        )
      ),
      l2: new ListNode(5, new ListNode(6, new ListNode(4))),
      output: new ListNode(
        6,
        new ListNode(
          6,
          new ListNode(4, new ListNode(0, new ListNode(0, new ListNode(1))))
        )
      ),
    },
    {
      l1: new ListNode(9),
      l2: new ListNode(4),
      output: new ListNode(3, new ListNode(1)),
    },
  ])('.addTwoNumbers($l1, $l2)', ({ l1, l2, output }) =>
    expect(addTwoNumbers(l1, l2)).toEqual(output)
  );
});
