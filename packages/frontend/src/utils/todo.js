export function parseDueDate(dateValue) {
  if (typeof dateValue !== 'string') {
    return null;
  }

  const trimmed = dateValue.trim();
  if (!trimmed) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isTodoOverdue(todo, now = new Date()) {
  if (!todo || todo.completed === true || todo.completed === 1) {
    return false;
  }

  const dueDate = parseDueDate(todo.dueDate);
  if (!dueDate) {
    return false;
  }

  const referenceNow = now instanceof Date ? now : new Date(now);
  if (Number.isNaN(referenceNow.getTime())) {
    return false;
  }

  return dueDate.getTime() < referenceNow.getTime();
}
