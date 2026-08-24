# Implementation Plan: Overdue Todo Items

**Branch**: `001-overdue-todo-items` | **Date**: 2026-08-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-overdue-todo-items/spec.md`

## Summary

This feature adds overdue detection and display to the existing todo app. The implementation will derive overdue state at render time from each todo’s completion flag, due date, and current local timestamp, then render both a warning visual treatment and the text label "Overdue" alongside a summary count when at least one overdue task exists. It will keep the change scoped to the current React frontend and the existing backend contract without introducing persisted overdue state.

## Technical Context

**Language/Version**: JavaScript (React 18 + Express 4); Node.js 18+ with Jest for tests

**Primary Dependencies**: React, react-scripts, Express, better-sqlite3, Jest, @testing-library/react

**Storage**: SQLite in-memory database for backend persistence; no schema change required for this feature

**Testing**: Jest with react-scripts test and backend Jest suites

**Target Platform**: Linux dev container; browser-based frontend; local Express API

**Project Type**: Web application (frontend + backend monorepo)

**Performance Goals**: Instant UI recalculation for list rendering; no noticeable lag for typical todo lists

**Constraints**: Must remain simple, accessible, and theme-aware; due-date comparison must use local timestamp precision; no persisted overdue flag or backend schema migration

**Scale/Scope**: Small single-user task list with a few dozen todos and a limited UI surface

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Pass: Quality and Clarity First — the feature keeps logic local, readable, and aligned with existing naming patterns in the UI and service modules.
- Pass: Single Responsibility and Minimal Complexity — overdue logic is derived in the frontend list/render layer, reusing the existing todo state without introducing new persistence or workflow scope.
- Pass: Test-Driven Reliability — the feature requires test coverage for overdue logic and display before completion; the plan includes a targeted validation matrix covering past, today, future, missing, invalid, completed, and incomplete cases.
- Pass: User-Centered Functionality — the feature directly supports the product requirement to visually identify overdue work without adding unrelated commands or filters.
- Pass: Accessible, Consistent, and Theme-Aware UI — the overdue state will use both text and visual treatment to satisfy accessibility and contrast expectations in both light and dark themes.

No constitution violations require a complexity exception.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todo-items/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
packages/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── TodoCard.js
│       │   ├── TodoList.js
│       │   ├── TodoForm.js
│       │   └── __tests__/
│       ├── services/
│       │   ├── todoService.js
│       │   └── __tests__/
│       ├── App.js
│       ├── App.css
│       ├── index.css
│       └── setupTests.js
└── backend/
    ├── src/
    │   ├── app.js
    │   └── index.js
    └── __tests__/
```

**Structure Decision**: The feature remains in the existing monorepo layout with frontend rendering and display logic in `packages/frontend/src`, while the backend contract remains in `packages/backend/src/app.js`. No new package or architecture pattern is required.

## Complexity Tracking

No constitutional violations or project complexity exceptions are required for this feature.
