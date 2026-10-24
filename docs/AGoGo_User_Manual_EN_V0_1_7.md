# AGoGo User Manual v0.1.7

**User Manual: Features and Installation**

- Plugin version: AGoGo v0.1.7
- Developer: Dr.HUMAN
- License: MIT
- Project URL: https://github.com/zlss20240168-ESG/AGoGo
- Document date: October 24, 2026

## 1. Overview

AGoGo is a ChatGPT plugin with a simple command workflow: it automatically submits `Go` in the current conversation at a fixed interval, so the AI can keep working on long-running tasks.

### 1.1 Key features

- Start with a single command: `@AGoGo T<n>D<n>`, where T is the total number of runs and D is the interval in hours.
- Fixed count and fixed interval. There is no infinite mode: up to 100 runs, with intervals of up to 100 hours.
- Every automatic submission is exactly `Go`.
- Check progress with `@AGoGo STATUS` and cancel with `@AGoGo STOP` at any time.
- AGoGo never intentionally renames the conversation.

## 2. Features

### 2.1 Command summary

| Command | Action |
|---|---|
| `@AGoGo T<n>D<n>` | Start a schedule |
| `@AGoGo STATUS` | Report the actual state of the associated schedule |
| `@AGoGo STOP` | Stop the associated active schedule |

### 2.2 Start command and parameters

| Parameter | Meaning | Accepted values |
|---|---|---|
| T | Total number of automatic `Go` submissions | 1–99; 0 or 00 means 100 |
| D | Interval in hours between automatic submissions | 1–99; 0 or 00 means 100 |

- T and D each accept one or two digits, for example `T10D04`.
- T must come before D. The format is fixed as `T<n>D<n>` and no comma is used between them.
- Spaces are ignored when the command is parsed.
- If the input is invalid (wrong order, missing value, more than two digits, or a non-numeric value), AGoGo replies with the correct format `@AGoGo T<n>D<n>` and does not create a schedule.

### 2.3 Execution rules

- The start command itself is not counted as a run.
- The first run happens one interval (D hours) after the start command.
- Each run enters and submits exactly `Go` in the current conversation.
- Run number n happens about n × D hours after the start; the last run happens about T × D hours after the start.

### 2.4 Examples

| Command | Runs | Interval | First run | Last run (approx.) |
|---|---:|---:|---|---|
| `@AGoGo T10D04` | 10 | 4 hours | 4 hours after start | 40 hours after start |
| `@AGoGo T1D1` | 1 | 1 hour | 1 hour after start | 1 hour after start |
| `@AGoGo T0D1` | 100 | 1 hour | 1 hour after start | 100 hours after start |
| `@AGoGo T10D0` | 10 | 100 hours | 100 hours after start | 1,000 hours after start (about 41.7 days) |

> **Watch out for extreme combinations**  
> `T0D0` means 100 runs, one every 100 hours. Finishing all runs would take about 10,000 hours (roughly 416.7 days). Check that this is what you want before entering 0 or 00.

### 2.5 Checking status (STATUS)

Enter `@AGoGo STATUS`. AGoGo reports the actual state of the associated schedule, including run progress and the next run time when the platform makes them available.

### 2.6 Stopping a schedule (STOP)

Enter `@AGoGo STOP`. AGoGo stops the active schedule and confirms only after the stop has succeeded. If there is no active schedule, it tells you so.

### 2.7 Start procedure

After a valid start command, AGoGo works through these steps in order:

1. Read and save the current conversation title.
2. Resolve T and D according to the rules above.
3. Create the schedule in the current conversation with the resolved values.
4. Read the conversation title again.
5. If the title differs from the saved one, restore the saved title; otherwise leave it unchanged.
6. Verify that the associated task exists and is active.

### 2.8 Notes

- The current conversation is the work context. You do not need to restate the project name or details.
- AGoGo only ever submits `Go`. If you want the AI to continue a specific task, describe that task clearly in the conversation first.
- Whether a schedule can be created depends on the scheduling capability the ChatGPT platform provides. After starting, enter `@AGoGo STATUS` to confirm the schedule's state.
- AGoGo never intentionally renames the conversation at any point.

## 3. Installation

The AGoGo installation package is provided on GitHub. Once the package is uploaded as a plugin, users can install and use it from the Plugins page in ChatGPT. Screenshots in the PDF edition are from v0.1.6 and use the Traditional Chinese interface; the steps are the same for v0.1.7.

### 3.1 Package contents

| File | Description |
|---|---|
| `plugin.json` | Plugin information: name, version, description, developer, license, and display settings |
| `skills/AGoGo/SKILL.md` | AGoGo skill: command format, rules, and execution procedure |
| `LICENSE` | MIT license text |

### 3.2 Get the package from GitHub

1. Open the project page: https://github.com/zlss20240168-ESG/AGoGo
2. Download the latest installation package (ZIP), for example `AGoGo-O-V0_1_7.zip`.
3. Check that, once extracted, the ZIP has `plugin.json` and the `skills` folder directly at its root, not inside an extra parent folder.

> A plugin's `plugin.json` must sit at the root of the package. If the ZIP contains an extra parent folder, the platform may not find the manifest.

### 3.3 Install the plugin

1. In ChatGPT, open **Plugins** and go to the AGoGo detail page.
2. Check the plugin name, developer, and skill (`agogo`).
3. Click **Install plugin**.
4. After installation, the button is replaced by **Manage** and **Try in chat**.

### 3.4 Confirm the skill is enabled and start using it

1. Click **Manage** to open the plugin settings page.
2. In the **Skills** section, check that the toggle next to `agogo` is on.
3. Return to the conversation and enter a start command, for example `@AGoGo T10D04`.
4. Enter `@AGoGo STATUS` to confirm the schedule was created.

### 3.5 Update to a new version (plugin owner)

1. On the AGoGo detail page, click the `...` button.
2. Choose **Upload new version** and select the new ZIP downloaded from GitHub.
3. After the upload, check that the version in the Information section shows the new version number.

The same menu also offers Edit plugin, Copy link, Download plugin ZIP, and Delete plugin.

### 3.6 Uninstall and delete

- **Uninstall:** On the plugin settings page, click Uninstall and confirm. The plugin is removed from your own account and cannot be used again until it is added again.
- **Delete the plugin (owner only):** Open the `...` menu and choose Delete plugin. Once deleted, everyone who used the plugin loses access, and the action cannot be undone.

> Before deleting, download the plugin ZIP if you want to keep a backup. To update the content, use Upload new version instead.

## 4. Troubleshooting

| Problem | Possible cause | What to do |
|---|---|---|
| No schedule is created after entering the command | Wrong command format or the agogo skill is off | Check `@AGoGo T<n>D<n>` (no comma), then confirm the skill toggle is on |
| AGoGo asks for the correct format | Wrong order, missing value, more than two digits, or non-numeric value | Re-enter a command such as `@AGoGo T10D04` |
| You are not sure the schedule really exists | Scheduling depends on what the platform provides | Enter `@AGoGo STATUS`; do not assume it was created from a reply alone |
| You want to end a schedule early | — | Enter `@AGoGo STOP` and wait for confirmation |
| The conversation title changed | The platform or another action changed the title | AGoGo attempts to restore the title when it starts a schedule; if it still differs, change it back manually |
| The version still shows the old number after uploading | `plugin.json` inside the ZIP was not updated | Set the version in `plugin.json` and upload again |

## 5. Release notes and license

### 5.1 What is new in v0.1.7

- Start command changed from `@AGoGo Tn, Dn` to `@AGoGo T<n>D<n>`; commas are no longer used.
- Invalid input handling is explicitly defined.
- After creating a schedule, AGoGo verifies that the task exists and is active.
- Added saving and restoring of the conversation title.
- STATUS reports the actual available state, and STOP reports when there is no active schedule.

### 5.2 License and contact

AGoGo is released under the MIT license.  
Developer: **Dr.HUMAN**  
Project: https://github.com/zlss20240168-ESG/AGoGo
