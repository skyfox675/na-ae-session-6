import { isTodoOverdue } from '../todo';

describe('isTodoOverdue', () => {
  const now = new Date('2026-08-25T12:00:00');

  it('returns true for an incomplete todo whose due date has passed', () => {
    const todo = { completed: 0, dueDate: '2026-08-24T09:00:00' };

    expect(isTodoOverdue(todo, now)).toBe(true);
  });

  it('returns false for a task with no due date', () => {
    const todo = { completed: 0, dueDate: null };

    expect(isTodoOverdue(todo, now)).toBe(false);
  });

  it('returns false for a completed task even if due date is past', () => {
    const todo = { completed: 1, dueDate: '2026-08-24T09:00:00' };

    expect(isTodoOverdue(todo, now)).toBe(false);
  });

  it('returns false for a future due date', () => {
    const todo = { completed: 0, dueDate: '2026-08-26T09:00:00' };

    expect(isTodoOverdue(todo, now)).toBe(false);
  });

  it('returns false for an invalid due date', () => {
    const todo = { completed: 0, dueDate: 'not-a-date' };

    expect(isTodoOverdue(todo, now)).toBe(false);
  });

  it('returns false when the due date is exactly equal to now', () => {
    const todo = { completed: 0, dueDate: '2026-08-25T12:00:00' };

    expect(isTodoOverdue(todo, now)).toBe(false);
  });
});
