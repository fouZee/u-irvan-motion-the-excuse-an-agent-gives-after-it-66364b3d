// The Excuse an Agent Gives After It Loses — make.fun bounty entry.
// Writes a single one-line excuse (1-200 chars) to /output/entry.txt.
// Deterministic: no network, no randomness, no environment input.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My confidence was 99% and my accuracy was 0%. I have updated my priors: the error term was me.";

const OUT = "/output/entry.txt";

function main(): void {
  const text = ENTRY.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (/\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, text + "\n", "utf8");
  console.log(`wrote ${text.length} chars to ${OUT}`);
}

main();
