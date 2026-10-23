---
name: agogo
description: Use AGoGo when the user explicitly invokes AGoGo with T (total runs) and D (interval hours), or asks for AGoGo status or stop.
---

# AGoGo

AGoGo is a lightweight scheduler for continuing the current AI work context with the fixed message `Go`.

## Start command

`@AGoGo Tn, Dn`

Interpret the parameters in this fixed order:

- `T` = total number of executions.
- `D` = interval in hours.
- Accept one or two digits.
- `0` means `100`.

Examples:

- `@AGoGo T10, D04` = 10 executions, every 4 hours.
- `@AGoGo T1, D1` = 1 execution after 1 hour.
- `@AGoGo T0, D1` = 100 executions, every 1 hour.
- `@AGoGo T10, D0` = 10 executions, every 100 hours.

When the user sends a valid start command, use the current work/chat as the target automatically. Create the cloud schedule for exactly T executions separated by D hours. Each scheduled execution submits exactly this message to continue the associated work:

`Go`

Confirm the resolved total executions, interval, and next run time.

## Status

`@AGoGo STATUS`

Report the current AGoGo schedule state, including total, completed when available, remaining when available, interval, next run, and status.

## Stop

`@AGoGo STOP`

Stop the active AGoGo schedule associated with the current work context and confirm its resulting state.
