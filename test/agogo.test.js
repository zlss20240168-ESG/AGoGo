import test from "node:test";
import assert from "node:assert/strict";
import {
  parseCommand,
  createTask,
  recordSuccessfulGo,
  stopTask,
  scheduledMessage,
  STATUS,
} from "../src/agogo.js";

const NOW = new Date("2026-10-23T00:00:00.000Z");

test("parses standard AGoGo command", () => {
  assert.deepEqual(parseCommand("@AGoGo T10, D04"), {
    command: "START",
    totalRuns: 10,
    intervalHours: 4,
  });
});

test("accepts one digit values", () => {
  assert.deepEqual(parseCommand("@AGoGo T1,D4"), {
    command: "START",
    totalRuns: 1,
    intervalHours: 4,
  });
});

test("zero means 100 for both T and D", () => {
  assert.deepEqual(parseCommand("@AGoGo T0, D0"), {
    command: "START",
    totalRuns: 100,
    intervalHours: 100,
  });
});

test("parses STATUS and STOP", () => {
  assert.deepEqual(parseCommand("@AGoGo STATUS"), { command: "STATUS" });
  assert.deepEqual(parseCommand("@AGoGo STOP"), { command: "STOP" });
});

test("creates active task and schedules first run", () => {
  const task = createTask({ totalRuns: 10, intervalHours: 4, targetId: "conversation-1", now: NOW, id: "task-1" });
  assert.equal(task.status, STATUS.ACTIVE);
  assert.equal(task.remaining_runs, 10);
  assert.equal(task.next_run_at, "2026-10-23T04:00:00.000Z");
});

test("successful Go decrements and eventually completes", () => {
  let task = createTask({ totalRuns: 2, intervalHours: 1, now: NOW, id: "task-2" });
  task = recordSuccessfulGo(task, new Date("2026-10-23T01:00:00.000Z"));
  assert.equal(task.remaining_runs, 1);
  assert.equal(task.status, STATUS.ACTIVE);
  assert.equal(task.next_run_at, "2026-10-23T02:00:00.000Z");

  task = recordSuccessfulGo(task, new Date("2026-10-23T02:00:00.000Z"));
  assert.equal(task.remaining_runs, 0);
  assert.equal(task.status, STATUS.COMPLETED);
  assert.equal(task.next_run_at, null);
});

test("STOP stops an active task", () => {
  const task = createTask({ totalRuns: 10, intervalHours: 4, now: NOW, id: "task-3" });
  const stopped = stopTask(task, NOW);
  assert.equal(stopped.status, STATUS.STOPPED);
  assert.equal(stopped.next_run_at, null);
});

test("scheduled payload is exactly Go", () => {
  assert.equal(scheduledMessage(), "Go");
});
