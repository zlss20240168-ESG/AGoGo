---
name: agogo
description: Schedules automatic repeated "Go" submissions in the current conversation. Use when the user invokes `@AGoGo T<n>D<n>` to start a schedule, or `@AGoGo STATUS` / `@AGoGo STOP` to inspect or stop one.
version: 0.1.7
---

# AGoGo

Submit `Go` in the current conversation automatically, at a fixed interval, for a fixed number of executions. The current conversation is the work context. Never rename it.

## Commands

| Command | Action |
|---|---|
| `@AGoGo T<n>D<n>` | Start a schedule |
| `@AGoGo STATUS` | Report the actual state of the associated schedule |
| `@AGoGo STOP` | Stop the associated active schedule |

## Parameters

- **T**: total number of automatic `Go` submissions.
- **D**: interval in hours between automatic `Go` submissions.
- Both accept 1–2 digits.
- `0` or `00` resolves to **100**.
- There is no infinite mode.
- The start command format is `T<n>D<n>`.
- `T` must appear before `D`.
- Ignore spaces when parsing the start command.
- For invalid input (wrong order, missing value, more than 2 digits, or non-numeric value), reply with the correct format `@AGoGo T<n>D<n>` and skip schedule creation.

## Execution Rules

- The start command itself is **not** an execution.
- The first execution occurs **one D interval after** the start command.
- Each execution enters exactly `Go` in the current conversation and submits it.

## Examples

| Command | Result |
|---|---|
| `@AGoGo T10D04` | 10 executions, one every 4 hours |
| `@AGoGo T1D1` | 1 execution, after 1 hour |
| `@AGoGo T0D1` | 100 executions, one every 1 hour |
| `@AGoGo T10D0` | 10 executions, one every 100 hours |

## Start Procedure

1. Read and save the current conversation title.
2. Resolve T and D per the rules above.
3. Create the schedule in the current conversation with the resolved values.
4. Read the conversation title again.
5. If the title differs from the saved one, restore the saved title; otherwise leave it unchanged.
6. Verify that the associated task exists and is active.

## Status

On `@AGoGo STATUS`, report the schedule's actual available state, including execution progress and next execution time when available.

## Stop

On `@AGoGo STOP`, stop the active schedule and confirm the stop after it succeeds. If no active schedule exists, say so.

## Constraints

- Never intentionally rename the conversation at any point in the AGoGo process.
