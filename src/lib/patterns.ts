// Bar fill patterns that overlay the team color, used to keep teams
// visually distinguishable on the chart even when colors are similar.
// Patterns only appear on the chart bars; the team color dot in the
// list stays a solid swatch for compactness.

export type Pattern =
  | "solid"
  | "diag"
  | "diag-rev"
  | "dots"
  | "horizontal"
  | "vertical"
  | "crosshatch";

export const PATTERNS: Pattern[] = [
  "solid",
  "diag",
  "dots",
  "horizontal",
  "diag-rev",
  "crosshatch",
  "vertical",
];

/** Picks the next pattern, biased away from `used` to maximize visual variety. */
export function pickNextPattern(used: readonly Pattern[]): Pattern {
  const counts = new Map<Pattern, number>();
  for (const p of PATTERNS) counts.set(p, 0);
  for (const u of used) counts.set(u, (counts.get(u) ?? 0) + 1);
  let best: Pattern = PATTERNS[0];
  let bestCount = Infinity;
  for (const p of PATTERNS) {
    const c = counts.get(p) ?? 0;
    if (c < bestCount) {
      best = p;
      bestCount = c;
    }
  }
  return best;
}
