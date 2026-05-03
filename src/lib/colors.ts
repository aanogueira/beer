// Warm-biased palette tuned to read well on a cream/amber background.
// Leads with beer-fest tones (amber, copper, brick, ochre, plum, burgundy)
// then folds in a few desaturated cool accents for distinction past ~10 teams.
export const colorPalette: readonly string[] = [
  "#b45309", // amber
  "#92400e", // copper
  "#78350f", // brown ale
  "#d97706", // gold
  "#ea580c", // burnt orange
  "#9a3412", // brick
  "#a16207", // ochre
  "#854d0e", // mustard
  "#7f1d1d", // burgundy
  "#9d174d", // plum
  "#831843", // wine
  "#3f6212", // hop green
  "#365314", // forest hop
  "#0f766e", // teal stout
  "#155e75", // slate cyan
  "#1e3a8a", // navy
  "#3730a3", // indigo
  "#581c87", // royal
  "#475569", // slate
  "#1f2937", // graphite
];

/** Returns the next color not already used; wraps if all are taken. */
export function pickNextColor(used: readonly string[]): string {
  const usedSet = new Set(used);
  const free = colorPalette.find((c) => !usedSet.has(c));
  if (free) return free;
  return colorPalette[used.length % colorPalette.length];
}
