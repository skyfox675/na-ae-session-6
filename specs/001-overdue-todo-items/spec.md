# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todo-items`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "Support for Overdue Todo Items — As a todo application user I want to easily identify and distinguish overdue tasks in my todo list so that I can prioritize my work and quickly see which tasks are past their due date. Users need a clear, visual way to identify which todos have not been completed by their due date. This feature must include automated tests covering the overdue determination logic and its display."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Spot overdue tasks at a glance (Priority: P1)

A user opens their todo list and immediately sees which incomplete tasks are past their due date, without comparing each due date to today's date themselves. Overdue tasks are visually distinct from tasks that are due later.

**Why this priority**: This is the core value of the feature. Without it, users must mentally compute overdue status for every item. It delivers a usable MVP on its own.

**Independent Test**: Create one incomplete task with a due date in the past and one with a due date in the future, open the list, and confirm only the past-due task is marked as overdue.

**Acceptance Scenarios**:

1. **Given** an incomplete task with a due date earlier than today, **When** the user views the todo list, **Then** the task is visually marked as overdue and labelled with an "Overdue" indicator.
2. **Given** an incomplete task with a due date later than today, **When** the user views the todo list, **Then** the task shows its due date with no overdue marking.
3. **Given** an incomplete task with a due date equal to today, **When** the user views the todo list, **Then** the task is NOT marked as overdue.
4. **Given** a task with no due date, **When** the user views the todo list, **Then** the task is never marked as overdue.
5. **Given** a completed task with a due date in the past, **When** the user views the todo list, **Then** the task is NOT marked as overdue.

---

### User Story 2 - Overdue status updates as tasks change (Priority: P2)

A user completes an overdue task, or edits its due date, and the overdue marking updates immediately to reflect the new state.

**Why this priority**: Keeps the indicator trustworthy. Users lose confidence in the signal if it goes stale after an action.

**Independent Test**: Mark an overdue task complete and confirm the overdue marking disappears; reopen it and confirm the marking returns.

**Acceptance Scenarios**:

1. **Given** a task marked as overdue, **When** the user marks it complete, **Then** the overdue marking is removed from that task.
2. **Given** a completed task with a past due date, **When** the user marks it incomplete again, **Then** the overdue marking reappears.
3. **Given** an overdue task, **When** the user edits its due date to a future date, **Then** the overdue marking is removed.
4. **Given** an overdue task, **When** the user clears its due date, **Then** the overdue marking is removed.

---

### User Story 3 - Understand overall overdue workload (Priority: P3)

A user sees a summary count of how many tasks are currently overdue, so they can gauge how far behind they are before scanning the list.

**Why this priority**: Useful for prioritisation but not required for the primary "spot overdue tasks" journey.

**Independent Test**: Create three overdue tasks and one upcoming task, then confirm the summary reports exactly three overdue tasks.

**Acceptance Scenarios**:

1. **Given** a list containing overdue and non-overdue tasks, **When** the user views the list, **Then** a count of overdue tasks is displayed.
2. **Given** a list containing no overdue tasks, **When** the user views the list, **Then** no overdue count is displayed.

---

### Edge Cases

- A task due today must not be treated as overdue at any time during that calendar day, including late evening.
- A task with an unparseable or malformed due date value must be displayed without an overdue marking rather than causing an error or empty list.
- The list remains readable when every task is overdue — the overdue treatment must not obscure task titles or actions.
- The overdue determination uses the user's local calendar date, so a user whose device date changes (travel, manual clock change) sees status recalculated on the next view.
- A list left open across midnight may show a task's status from the previous day until the list is next refreshed or changed; this is acceptable and not a defect.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST classify a task as overdue when the task is incomplete AND its due date is strictly earlier than the current local calendar date.
- **FR-002**: System MUST NOT classify a task as overdue when it has no due date, when its due date is today or later, or when it is already complete.
- **FR-003**: System MUST compare dates at whole-day granularity, ignoring time of day, so that a task due today is never overdue during that day.
- **FR-004**: System MUST display a clearly distinguishable visual treatment on each overdue task, so that overdue tasks are separable from other tasks at a glance.
- **FR-005**: System MUST accompany the visual treatment with a text indicator ("Overdue") so that status is not conveyed by colour alone.
- **FR-006**: System MUST expose the overdue state to assistive technology so that screen-reader users receive the same status information as sighted users.
- **FR-007**: System MUST keep the overdue treatment legible and compliant with contrast expectations in both light and dark themes.
- **FR-008**: System MUST re-evaluate a task's overdue status whenever its completion state or due date changes, and reflect the result without requiring a manual page reload.
- **FR-009**: System MUST handle missing or invalid due date values by treating the task as not overdue, without producing an error or interrupting list rendering.
- **FR-010**: System MUST display a count of currently overdue tasks when at least one task is overdue.
- **FR-011**: Overdue status MUST be derived at display time from existing task data; no separate user action is required to mark a task overdue.
- **FR-012**: The overdue determination logic and its display MUST be covered by automated tests, including past, today, future, missing, and invalid due dates, and both complete and incomplete tasks.

### Key Entities

- **Todo Item**: An existing task with a title, an optional due date, and a completion state. Overdue status is a derived characteristic of this entity, not a stored attribute.
- **Overdue Status**: A derived, read-only classification of a Todo Item — true only when the item is incomplete and its due date has already passed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can identify every overdue task in a list of 20 mixed tasks within 5 seconds, without opening or inspecting individual tasks.
- **SC-002**: 100% of tasks classified as overdue satisfy the rule "incomplete AND due date before today", verified across past, today, future, empty, and invalid due date cases.
- **SC-003**: Overdue status shown to the user updates within one second of completing a task or changing its due date.
- **SC-004**: Overdue status is conveyed by at least two independent cues (text and visual treatment), so users relying on assistive technology or with colour vision deficiency receive the same information.
- **SC-005**: Automated test coverage for the project remains at or above the 80% target with the new overdue logic and display included.
- **SC-006**: Zero errors or blank list renders occur when tasks contain missing or malformed due date values.

## Assumptions

- The existing todo item already supports an optional due date; no new data capture is introduced by this feature.
- Overdue status is derived at display time and is not persisted, so no data migration is required.
- Due dates are date-only values without a time component; therefore "overdue" means the whole due day has passed.
- The comparison uses the user's local device date, consistent with a single-user application with no server-side scheduling.
- Filtering, sorting, or notifying by overdue status is out of scope for this feature; only identification and a summary count are included.
- The existing design system supplies an appropriate warning/danger colour and theme tokens for both light and dark modes.
- The visual treatment reuses the existing task list layout; no new screens or navigation are introduced.
