---
name: agogo
description: Schedule repeated Go nudges for an AI task when the user invokes AGoGo with T (total runs) and D (delay in hours), and help check or stop that schedule.
---

# AGoGo-O

Use AGoGo with ChatGPT's cloud scheduled-task capability.

## Command grammar

The start command is:

`@AGoGo Tn, Dn`

Interpret parameters in this fixed order:

- `T` is the total number of executions.
- `D` is the interval in hours.
- Accept one or two digits for each value.
- A value of `0` means `100`.

Examples:

- `@AGoGo T10, D04` means 10 executions, one every 4 hours.
- `@AGoGo T1, D1` means 1 execution after 1 hour.
- `@AGoGo T0, D1` means 100 executions, one every hour.
- `@AGoGo T10, D0` means 10 executions, one every 100 hours.

## Start workflow

When the user gives a valid start command:

1. Resolve T and D according to the grammar above.
2. Create a ChatGPT cloud scheduled task associated with the current work context.
3. Schedule exactly T runs separated by D hours.
4. On each scheduled run, continue the associated work by submitting the exact user message `Go`.
5. Keep the schedule in ChatGPT's cloud task system so it can run without the user's local device remaining open.
6. Confirm the resolved total executions, interval, and next run time.

## Status

When the user invokes `@AGoGo STATUS`, report the associated scheduled task's current state, including total runs, completed runs when available, remaining runs when available, interval, next run, and whether it is active, paused/stopped, or completed.

## Stop

When the user invokes `@AGoGo STOP`, stop or pause the associated active AGoGo scheduled task and confirm its resulting state.

## Scheduled message

The scheduled continuation message is exactly:

`Go`
