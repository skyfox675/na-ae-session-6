# Data Model: Overdue Todo Items

## Overview

The feature does not introduce a new persisted entity. It reuses the existing todo item model and derives a read-only `isOverdue` characteristic from its current state.

## Entity: Todo Item

| Field | Type | Required | Description | Validation |
| --- | --- | --- | --- | --- |
| `id` | integer | Yes | Database identifier for the task | Positive integer |
| `title` | string | Yes | User-visible task label | Non-empty after trim, max 255 chars |
| `dueDate` | string or null | No | Optional due timestamp in ISO/local-compatible format | If present, must parse successfully; invalid values are treated as not overdue |
| `completed` | boolean/integer | Yes | Completion state | 0 = incomplete, 1 = complete |
| `createdAt` | string | Yes | Creation timestamp | ISO timestamp from SQLite |

## Derived status

### `isOverdue`

A Todo Item has an `isOverdue` status derived at render time using the following logic:

```javascript
const hasDueDate = !!todo.dueDate && !Number.isNaN(new Date(todo.dueDate).getTime());
const isIncomplete = !todo.completed;
const dueTime = new Date(todo.dueDate).getTime();
const now = Date.now();

const isOverdue = hasDueDate && isIncomplete && dueTime < now;
```

### Rules

- `completed === true` => never overdue
- `dueDate` missing/null => never overdue
- invalid due date => never overdue
- due timestamp exactly equal to current moment => not overdue
- due timestamp earlier than current moment => overdue

## Relationships

- Each Todo Item stands alone; no parent/child or category relationships are required.
- The overdue status is derived from the Todo Item itself and is not persisted as a separate record.

## State transitions

### Create

- New items default to incomplete.
- If no due date is set, the item is never overdue.

### Complete toggle

- Toggle to complete => immediately clears overdue status.
- Toggle back to incomplete => status is recomputed based on the current due date and time.

### Edit due date

- Setting a past due moment while incomplete => item becomes overdue.
- Setting a future due date or clearing dueDate => item is no longer overdue.

### Delete

- Removing a Todo Item removes it from the overdue count and list rendering immediately.
