# Research: Overdue Todo Items

## Decision

The app will derive overdue status at display time from the existing Todo Item data rather than storing a separate computed flag in the database. A task is overdue only when all of the following are true:

- `completed` is false or equivalent to incomplete
- `dueDate` is present and parseable
- `new Date(dueDate).getTime() < Date.now()` based on the user’s local system clock, with comparison using exact timestamp precision

The list UI will render a visible `Overdue` label and a warning-style visual treatment for tasks that meet this rule. The overdue summary count will be computed from the same derived condition to keep the display, label, and count consistent.

## Rationale

This matches the specification’s requirement that overdue status be a derived, read-only classification rather than a persisted property. It also keeps the feature small and aligned with the current React + Express design, where the frontend already owns view logic and the backend only exposes todos.

The comparison should use exact timestamps, not just calendar dates, because the clarified requirement states that "Compare by full timestamp, including time of day." That ensures a task due later today is not marked overdue until the due moment has actually passed.

## Alternatives considered

### 1. Persist an `isOverdue` boolean on each todo
- Rejected because it introduces duplication and stale data risk. Completed tasks and date edits would require additional synchronization logic.
- It also conflicts with the specification’s requirement that overdue status be derived from existing task data.

### 2. Compare only date portions with `new Date(dateString)` on midnight boundaries
- Rejected because it would treat all tasks due later on the same date as already overdue and violates the clarified requirement to compare by full timestamp.

### 3. Enforce overdue logic in the backend API
- Rejected as an unnecessary architectural expansion. The current app exposes plain todo data; computing the status in the frontend preserves a simple contract and keeps logic close to the list rendering.

### 4. Add a separate overdue filter/sort feature
- Rejected as out of scope. The feature requires identification and a summary count only, not filtering or sorting behavior.

## Notes for implementation

- Missing, null, or malformed due-date values must be treated as not overdue.
- Tasks marked complete must never display overdue indicators even when a past due date exists.
- Equality comparisons are intentionally non-overdue: a task whose due moment is equal to the current instant is not yet overdue.
- The visual treatment and `aria-label`/screen-reader text must communicate status in two ways so the feature remains accessible and useful in both light and dark themes.
