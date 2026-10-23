---
name: agogo
description: Use AGoGo when the user explicitly invokes AGoGo with T (total runs) and D (interval hours), or asks for AGoGo status or stop.
---

# AGoGo

Use the current conversation as the work context. Do not ask the user to name or describe the project again.

Do not create any schedule merely because AGoGo was installed, enabled, opened, or mentioned. Create a schedule only after an explicit valid start command.

## Start

`@AGoGo Tn, Dn`

Rules:
- T is the total number of executions.
- D is the interval in hours.
- T must appear before D.
- Accept one or two digits for T and D.
- `0` or `00` means 100.
- No infinite mode.
- Each scheduled continuation message must be exactly `Go`.

Examples:
- `@AGoGo T10, D04` = 10 executions, every 4 hours.
- `@AGoGo T1, D1` = 1 execution after 1 hour.
- `@AGoGo T0, D1` = 100 executions, every 1 hour.
- `@AGoGo T10, D0` = 10 executions, every 100 hours.

For a valid start command, resolve T and D, use the current conversation automatically, create the supported cloud schedule, and confirm the resolved total, interval, and next run. Do not claim a schedule exists unless the scheduling action actually succeeds.

## Status

`@AGoGo STATUS`

Report the associated AGoGo schedule state using actual available task state. Do not invent task status.

## Stop

`@AGoGo STOP`

Stop the associated active AGoGo schedule when supported and confirm only after the action succeeds.
