/** @since 1.0.0 */

/** @internal */
export const replaceCharAt = (s: string, i: number, c: string): string =>
  s.substring(0, i) + c + s.substring(i + 1)

/** @internal */
export const locationToIndex = (
  s: string,
  location: number | ((s: string) => number),
): number =>
  // istanbul ignore next
  typeof location === 'number' ? location : location(s)
