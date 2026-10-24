# AGoGo

AGoGo is a lightweight ChatGPT plugin / skill workflow for scheduled AI continuation nudges.

Current version: **v0.1.7**

License: **MIT**

## What AGoGo does

AGoGo automatically submits the fixed message `Go` in the current ChatGPT conversation at a fixed interval for a fixed number of executions, so an existing long-running task can continue without the user manually typing `Go` every time.

The current conversation is the work context. AGoGo should not intentionally rename the conversation.

## Start command

```text
@AGoGo T<n>D<n>
```

Where:

- `T` = total number of automatic `Go` submissions.
- `D` = interval in hours between submissions.
- `T` and `D` each accept 1–2 digits.
- `0` or `00` resolves to `100`.
- There is no infinite mode.
- `T` must appear before `D`.
- Spaces are ignored when parsing the start command.
- No comma is used between `T` and `D`.

Examples:

```text
@AGoGo T10D04
@AGoGo T1D1
@AGoGo T20D1
@AGoGo T0D1
@AGoGo T10D0
```

Example meaning:

```text
@AGoGo T20D1
```

means 20 automatic executions, one every 1 hour.

Each scheduled execution submits exactly:

```text
Go
```

## Execution rules

- The start command itself is not counted as an execution.
- The first execution occurs one `D` interval after the start command.
- Run number `n` occurs approximately `n × D` hours after the start.
- The last run occurs approximately `T × D` hours after the start.
- Maximum run count: 100.
- Maximum interval: 100 hours.

## Commands

Create a schedule:

```text
@AGoGo T<n>D<n>
```

Check the actual available schedule state:

```text
@AGoGo STATUS
```

Stop the associated active schedule:

```text
@AGoGo STOP
```

## Invalid input

If the start command has the wrong order, a missing value, more than two digits, or a non-numeric value, AGoGo should reply with the correct format:

```text
@AGoGo T<n>D<n>
```

and skip schedule creation.

## Conversation-title behavior

AGoGo v0.1.7 includes a defensive title-preservation procedure:

1. Read and save the current conversation title.
2. Parse `T` and `D`.
3. Create the schedule in the current conversation.
4. Read the conversation title again.
5. If the title differs from the saved title, restore the saved title.
6. Verify that the associated task exists and is active.

This is intended to prevent AGoGo itself from renaming the conversation. Platform behavior may still vary and is an important Beta test target.

## Beta testing

AGoGo v0.1.7 is being tested for real-world scheduling behavior. Useful test reports include:

- Whether the requested number of runs actually completes.
- Whether a schedule stops unexpectedly.
- Whether the conversation title changes after schedule creation.
- Whether execution mode changes unexpectedly.
- Whether `STATUS` matches actual behavior.
- Whether `STOP` reliably stops the active schedule.
- Platform, device, browser/app, and ChatGPT plan.

Failures and reproducible edge cases are especially useful.

## Installation package structure

The install ZIP should contain the plugin manifest and skill folder directly at the ZIP root:

```text
plugin.json
skills/AGoGo/SKILL.md
LICENSE
```

Do not wrap these files inside an additional parent directory.

## Repository plan

- Phase 1: **AGoGo-O** — OpenAI-oriented implementation and integration validation.
- Phase 2: **AGoGo-C** — general cloud implementation after AGoGo-O is completed and validated.

The product name is **AGoGo**. The suffixes **-O** and **-C** identify the execution variant. The standalone word `Go` is only the scheduled message content.
