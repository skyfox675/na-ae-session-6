# Quickstart: Overdue Todo Validation

## Prerequisites

- Node.js 18+
- npm
- project dependencies installed

## Setup

```bash
cd /workspaces/na-ae-session-6
npm install
```

## Run the app

```bash
npm run start
```

Expected outcome:
- The frontend loads the todo list in the browser.
- The Express backend is available on the configured proxy port.

## Validate overdue behavior

1. Create or edit a todo with a due date in the past while leaving it incomplete.
2. Confirm the todo is visually styled as overdue and includes the text label `Overdue`.
3. Create or edit a todo due later today or in the future.
4. Confirm it is not marked overdue.
5. Complete an overdue todo and confirm the overdue styling disappears.
6. Reopen the todo and confirm it reappears when the due date is still in the past.
7. Clear the due date or use an invalid due-date value and confirm the item never receives an overdue badge.

## Run automated verification

```bash
npm test
```

Expected outcome:
- Frontend and backend tests run successfully.
- New overdue logic and UI coverage is present in the relevant test suites.

## Reference artifacts

- [data-model.md](data-model.md)
- [contracts/todo-api.md](contracts/todo-api.md)
- [research.md](research.md)
