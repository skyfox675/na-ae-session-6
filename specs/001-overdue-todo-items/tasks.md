---

description: "Actionable task list for overdue todo item support"
---

# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `specs/001-overdue-todo-items/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/todo-api.md`, `quickstart.md`

**Tests**: Included because `spec.md` explicitly requires automated coverage for overdue determination and display.

**Organization**: Tasks are grouped by priority-ordered user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing frontend test and styling surfaces used by this feature.

- [ ] T001 [P] Confirm the frontend Jest command and coverage configuration in `packages/frontend/package.json`
- [ ] T002 [P] Confirm the existing todo component test fixtures and handler conventions in `packages/frontend/src/components/__tests__/TodoCard.test.js` and `packages/frontend/src/components/__tests__/TodoList.test.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared display-time overdue calculation without changing the backend contract or persistence model.

- [ ] T003 Create the shared overdue predicate module in `packages/frontend/src/utils/todo.js`, accepting a todo and current timestamp while treating missing and invalid due dates as non-overdue
- [ ] T004 [P] Add the utility module to frontend coverage through `packages/frontend/package.json` collection rules and ensure it is importable by todo components

**Checkpoint**: Shared overdue calculation is available to all stories; no API or database migration is required.

---

## Phase 3: User Story 1 - Spot overdue tasks at a glance (Priority: P1) - MVP

**Goal**: Mark only incomplete todos whose parseable due timestamp is strictly earlier than the current local timestamp, using both a visible label and accessible status text.

**Independent Test**: Render one incomplete past-due todo and one future-due todo in the list and confirm only the past-due card has the `Overdue` label, overdue class, and assistive-technology status.

### Tests for User Story 1

- [ ] T005 [P] [US1] Add unit coverage for past, future, same-day, missing, invalid, completed, and incomplete due-date cases in `packages/frontend/src/utils/__tests__/todo.test.js`
- [ ] T006 [P] [US1] Add component coverage for the overdue label, visual class, accessible status, and non-overdue rendering in `packages/frontend/src/components/__tests__/TodoCard.test.js`

### Implementation for User Story 1

- [ ] T007 [US1] Integrate the shared overdue predicate into `packages/frontend/src/components/TodoCard.js` using the current timestamp and completion state
- [ ] T008 [US1] Render the `Overdue` text indicator and an assistive-technology label in `packages/frontend/src/components/TodoCard.js` without hiding the due date or task actions
- [ ] T009 [US1] Add a theme-aware overdue visual treatment with sufficient light and dark theme contrast in `packages/frontend/src/App.css` and `packages/frontend/src/styles/theme.css`

**Checkpoint**: User Story 1 is independently functional and testable for all required date and completion cases.

---

## Phase 4: User Story 2 - Overdue status updates as tasks change (Priority: P2)

**Goal**: Recompute the derived status immediately when completion or due-date data changes through existing toggle and edit flows.

**Independent Test**: Render an overdue todo, toggle it complete and confirm the marking disappears, toggle it incomplete and confirm it returns, then edit its due date to future and null values and confirm it remains absent.

### Tests for User Story 2

- [ ] T010 [P] [US2] Add interaction coverage for complete/incomplete transitions and edit-to-future/edit-to-cleared transitions in `packages/frontend/src/components/__tests__/TodoCard.test.js`

### Implementation for User Story 2

- [ ] T011 [US2] Ensure `packages/frontend/src/components/TodoCard.js` derives overdue state from current `todo.completed` and `todo.dueDate` props on every render after existing toggle and edit callbacks resolve
- [ ] T012 [US2] Verify the existing state refresh path supplies updated todo records to `packages/frontend/src/App.js` and preserves immediate card rerender without adding persisted overdue state

**Checkpoint**: Completion and due-date changes update the overdue treatment without a page reload or backend contract change.

---

## Phase 5: User Story 3 - Understand overall overdue workload (Priority: P3)

**Goal**: Show the number of currently overdue todos when the count is nonzero, using the same predicate as individual cards.

**Independent Test**: Render three overdue todos and one upcoming todo, confirm the summary reports three, then render a list with no overdue todos and confirm no overdue summary is shown.

### Tests for User Story 3

- [ ] T013 [P] [US3] Add summary-count coverage for mixed overdue/non-overdue lists and zero-overdue lists in `packages/frontend/src/components/__tests__/TodoList.test.js`

### Implementation for User Story 3

- [ ] T014 [US3] Compute the overdue count with the shared predicate and render an accessible summary only when the count is greater than zero in `packages/frontend/src/components/TodoList.js`
- [ ] T015 [US3] Add responsive, theme-aware summary styling that remains legible when all todos are overdue in `packages/frontend/src/App.css`

**Checkpoint**: The list summary stays consistent with individual card indicators and disappears when no task is overdue.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete feature against project quality, accessibility, and quickstart requirements.

- [ ] T016 [P] Run the frontend test suite with coverage using `npm run test --workspace=frontend` and confirm overdue logic and display coverage are included
- [ ] T017 [P] Run the full monorepo test suite using `npm test` and confirm existing backend behavior remains unaffected
- [ ] T018 Validate the overdue workflow, theme readability, keyboard/screen-reader status, malformed dates, and no-overdue summary behavior against `specs/001-overdue-todo-items/quickstart.md`
- [ ] T019 Review changed frontend files for 2-space indentation, clear naming, accessible status communication, and no persisted `isOverdue` field in `packages/frontend/src`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No implementation dependency; establishes test and source conventions.
- **Foundational (Phase 2)**: Depends on Setup and provides the shared predicate; blocks user story implementation.
- **User Story 1 (Phase 3)**: Depends on Phase 2 and delivers the MVP.
- **User Story 2 (Phase 4)**: Depends on the card integration from Phase 3; it validates existing mutation flows against derived rendering.
- **User Story 3 (Phase 5)**: Depends on the shared predicate from Phase 2 and the card semantics from Phase 3; it adds list-level aggregation.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; no dependency on another user story.
- **US2 (P2)**: Uses the US1 card treatment and predicate integration; independently verifies state changes.
- **US3 (P3)**: Uses the shared predicate and aligns its count with US1; does not require backend changes.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T005 and T006 can run in parallel before US1 implementation.
- T010 and T013 are independent test additions once their respective behavior surfaces are understood.
- T016 and T017 can run in parallel after implementation; T018 follows the executable test checks.

## Parallel Example: User Story 1

```text
Task T005: Add overdue predicate tests in packages/frontend/src/utils/__tests__/todo.test.js
Task T006: Add TodoCard overdue display tests in packages/frontend/src/components/__tests__/TodoCard.test.js
```

## Parallel Example: User Story 3

```text
Task T013: Add TodoList overdue-count tests in packages/frontend/src/components/__tests__/TodoList.test.js
Task T015: Add summary styling in packages/frontend/src/App.css
```

## Implementation Strategy

### MVP First

1. Complete Phases 1 and 2.
2. Complete Phase 3 for US1.
3. Run the focused frontend tests and validate the independent US1 criteria.
4. Demo or release the overdue card marking as the MVP.

### Incremental Delivery

1. Add US2 to verify completion and due-date edits never leave stale indicators.
2. Add US3 for the workload summary.
3. Run the full test suite and quickstart validation.
4. Deliver each story without adding backend persistence or out-of-scope filtering.

## Notes

- `[P]` marks tasks that can run in parallel because they target independent files or validation surfaces.
- `[US1]`, `[US2]`, and `[US3]` map tasks to the corresponding prioritized stories in `spec.md`.
- Tests must be written and observed failing before the related implementation tasks are completed.
- Overdue status remains derived at render time; the API contract in `specs/001-overdue-todo-items/contracts/todo-api.md` remains unchanged.