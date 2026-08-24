# Todo API Contract

## Overview

The backend exposes a minimal REST API for todo lifecycle operations. The overdue feature does not require a new API contract; it relies on the existing list payload and computed UI state.

## Endpoints

### GET /api/todos

Returns all todo items in reverse creation order.

Response:

```json
[
  {
    "id": 1,
    "title": "Learn React",
    "dueDate": "2025-12-15",
    "completed": 0,
    "createdAt": "2026-08-24T12:00:00.000Z"
  }
]
```

### POST /api/todos

Creates a new todo item.

Request:

```json
{
  "title": "Review sprint goals",
  "dueDate": "2026-08-26"
}
```

Response: the created todo record.

### PUT /api/todos/:id

Updates the title and/or due date for an existing todo.

Request:

```json
{
  "title": "Review sprint goals",
  "dueDate": "2026-08-26"
}
```

Response: the updated todo record.

### PATCH /api/todos/:id/toggle

Toggles the completion state.

Response: the updated todo record.

### DELETE /api/todos/:id

Deletes an existing todo.

Response:

```json
{
  "message": "Todo deleted successfully",
  "id": 1
}
```

## Contract assumptions for overdue logic

- Due dates remain optional and may be stored as plain strings.
- The API does not calculate or persist an overdue flag.
- Consumers must derive status client-side using the current local time and completion state.
- Invalid or missing dates should be treated as non-overdue and not cause a 400-level error during rendering.
