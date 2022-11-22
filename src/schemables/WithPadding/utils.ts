/**
 * Utilities for `WithPadding`
 *
 * @since 1.0.0
 */
import { matchOn } from '../../internal/match'

/** @internal */
export const match = matchOn('by')

/** @internal */
export const foldUnion: (n: number | ((s: string) => number)) => (s: string) => number =
  n => s =>
    typeof n === 'function' ? n(s) : n

/**
 * Removes characters starting at the right while a condition is met
 *
 * @internal
 */
export const stripRightWhile: (
  predicate: (char: string) => boolean,
) => (s: string) => string = predicate => s => {
  const out = s.split('')
  for (let i = out.length - 1; i >= 0; --i) {
    if (!predicate(out[i] as string)) {
      break
    }
    out[i] = ''
  }
  return out.join('')
}

/**
 * Removes characters starting at the left while a condition is met
 *
 * @internal
 */
export const stripLeftWhile: (
  predicate: (char: string) => boolean,
) => (s: string) => string = predicate => s => {
  const out = s.split('')
  for (let i = 0; i < out.length; ++i) {
    if (!predicate(out[i] as string)) {
      break
    }
    out[i] = ''
  }
  return out.join('')
}
