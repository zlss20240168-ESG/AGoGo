# AGoGo

AGoGo is a lightweight watchdog for scheduled AI workflow nudges.

## Phase 1: AGoGo-O

AGoGo-O is the OpenAI-first version. Its user-facing syntax is:

```text
@AGoGo T10, D04
```

Where:

- `T` = total number of scheduled executions.
  - `T1` = 1 execution
  - `T10` = 10 executions
  - `T0` = 100 executions
- `D` = delay/interval in hours between executions.
  - `D1` = every 1 hour
  - `D04` = every 4 hours
  - `D0` = every 100 hours

The intended scheduled action is to submit the fixed message:

```text
Go
```

to the same linked AI task or conversation context.

## Core task model

Each task tracks:

```text
task_id
total_runs
completed_runs
remaining_runs
interval_hours
next_run_at
status
created_at
updated_at
```

Status values:

```text
ACTIVE
STOPPED
COMPLETED
```

## Commands

Create a schedule:

```text
@AGoGo T10, D04
```

Check status:

```text
@AGoGo STATUS
```

Stop the current schedule:

```text
@AGoGo STOP
```

## Repository plan

- Phase 1: AGoGo-O — OpenAI-oriented implementation and integration validation.
- Phase 2: AGoGo-C — general cloud implementation after AGoGo-O is completed and validated.

The product name is **AGoGo**. The suffixes **-O** and **-C** identify the execution variant. The standalone word `Go` is only the scheduled message content.
