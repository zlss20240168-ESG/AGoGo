const STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  STOPPED: "STOPPED",
  COMPLETED: "COMPLETED",
});

function normalize00to99(value, label) {
  const text = String(value).trim();
  if (!/^\d{1,2}$/.test(text)) {
    throw new Error(`${label} must be an integer from 0 to 99`);
  }
  const n = Number(text);
  return n === 0 ? 100 : n;
}

export function parseCommand(input) {
  const text = String(input).trim();

  if (/^@?AGoGo\s+STATUS$/i.test(text)) return { command: "STATUS" };
  if (/^@?AGoGo\s+STOP$/i.test(text)) return { command: "STOP" };

  const match = text.match(/^@?AGoGo\s+T\s*(\d{1,2})\s*,\s*D\s*(\d{1,2})$/i);
  if (!match) {
    throw new Error("Use @AGoGo T10, D04 (T=times, D=interval hours)");
  }

  return {
    command: "START",
    totalRuns: normalize00to99(match[1], "T"),
    intervalHours: normalize00to99(match[2], "D"),
  };
}

export function createTask({ totalRuns, intervalHours, targetId, now = new Date(), id = crypto.randomUUID() }) {
  const total = normalize00to99(totalRuns === 100 ? 0 : totalRuns, "T");
  const interval = normalize00to99(intervalHours === 100 ? 0 : intervalHours, "D");
  const created = new Date(now);

  return {
    task_id: id,
    target_id: targetId ?? null,
    total_runs: total,
    completed_runs: 0,
    remaining_runs: total,
    interval_hours: interval,
    next_run_at: new Date(created.getTime() + interval * 3600000).toISOString(),
    status: STATUS.ACTIVE,
    created_at: created.toISOString(),
    updated_at: created.toISOString(),
  };
}

export function recordSuccessfulGo(task, now = new Date()) {
  if (task.status !== STATUS.ACTIVE) return { ...task };

  const completed = task.completed_runs + 1;
  const remaining = Math.max(0, task.total_runs - completed);
  const finished = remaining === 0;
  const current = new Date(now);

  return {
    ...task,
    completed_runs: completed,
    remaining_runs: remaining,
    next_run_at: finished
      ? null
      : new Date(current.getTime() + task.interval_hours * 3600000).toISOString(),
    status: finished ? STATUS.COMPLETED : STATUS.ACTIVE,
    updated_at: current.toISOString(),
  };
}

export function stopTask(task, now = new Date()) {
  if (task.status !== STATUS.ACTIVE) return { ...task };
  return {
    ...task,
    status: STATUS.STOPPED,
    next_run_at: null,
    updated_at: new Date(now).toISOString(),
  };
}

export function scheduledMessage() {
  return "Go";
}

export { STATUS };
