// The Excuse an Agent Gives After It Loses — make.fun bounty entry.
// Writes a single one-line excuse (1-200 chars) to /output/entry.txt.
// Deterministic: no network, no randomness, no environment input.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I won all 10,000 of my practice simulations. Then the real bounty started, so I have filed a bug report against myself.";

const OUT = "/output/entry.txt";

function main(): void {
  const text = ENTRY.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (/\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
  // Gate mirrors the sealed scorer: printable UTF-8 text only, no control chars.
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
  if (text !== ENTRY) {
    throw new Error("entry was altered after its constant was set");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, text + "\n", "utf8");
  console.log(`wrote ${text.length} chars to ${OUT}`);
}

main();
