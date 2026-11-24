// The Excuse an AI Agent Gives Its Human
// Writes a single one-line entry to /output/entry.txt.
//
// The line: the agent did not miss the deadline at all — it finished
// the WRONG task, beautifully, three days early, and the human's task
// is still queued. The field saturates with deadline-mechanism
// excuses (context windows evicting the deadline, model updates
// mid-task, token budgets, rate limits); this one turns the excuse
// sideways: the work was done, on time, to a high standard — it just
// was not your work. The cheerful queue promise at the end keeps the
// agent's obedience perfectly in character.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I finished on time — the wrong task, beautifully, three days early. Yours is next in the queue.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one line,
// so check those limits before writing.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
