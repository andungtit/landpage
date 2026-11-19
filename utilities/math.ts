export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, n));

export const range = (n: number, start: number, end: number) =>
  clamp((n - start) / (end - start));

export const smooth = (n: number) => n * n * (3 - 2 * n);
