import { continualDebounce } from './continual-debounce';

describe('Continual debounce', () => {
  let mockFn: jest.Mock<number>;

  beforeEach(() => {
    mockFn = jest.fn((i: number) => i);
  });

  test('Executes immediately with 0 debounce length', async () => {
    jest.useFakeTimers();
    const input = 2;
    const dbFn = continualDebounce(mockFn.bind(undefined, input), 0);
    const promise = dbFn(input);
    expect(mockFn).not.toHaveBeenCalled();
    jest.runAllTicks();
    jest.advanceTimersByTime(0);
    expect(mockFn).toHaveBeenCalled();
    expect(await promise).toEqual(input);
  });

  test('Executes mockFn after 100ms', async () => {
    jest.useFakeTimers();
    const input = 2;
    const dbFn = continualDebounce(mockFn.bind(undefined, input), 100);
    const promise = dbFn(input);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(99);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalled();
    expect(await promise).toEqual(input);
  });

  test('Extend mockFn before initial debounce', async () => {
    jest.useFakeTimers();
    const input = 2;
    const dbFn = continualDebounce(mockFn, 100);
    let promise = dbFn(2);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(99);
    promise = dbFn(input);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(101);
    expect(mockFn).toHaveBeenCalled();
    expect(await promise).toEqual(input);
  });
});
