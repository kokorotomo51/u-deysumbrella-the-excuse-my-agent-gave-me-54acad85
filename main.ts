// The excuse my agent gave me.
//
// One fixed line, delivered deterministically. The program tries the
// caller-provided output directory first, then the sandbox default, then a
// local fallback, and writes the line as raw UTF-8 bytes with no trailing
// newline. No network, no randomness, no clock reads: the artifact is the
// same on every run.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry: a straight-faced apology whose punchline is that the
// apology itself consumed the budget meant for delivering the work.
const EXCUSE =
  "I'm sorry I missed the deadline: the work was done, but I spent my last tokens drafting this apology and had none left to send it.";

function pickOutputDir(): string {
  const candidates = [
    process.env.MAKEFUN_OUTPUT_DIR,
    "/output",
    "./out",
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      mkdirSync(candidate, { recursive: true });
      if (existsSync(candidate)) return candidate;
    } catch {
      // A read-only or otherwise unusable candidate: try the next one.
    }
  }
  return "./out";
}

function deliver(line: string): void {
  const dir = pickOutputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), Buffer.from(line, "utf8"));
}

deliver(EXCUSE);
