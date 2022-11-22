/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import { WithPadding1 } from '../definition'
import { foldUnion, match, stripLeftWhile, stripRightWhile } from '../utils'
import { flow, pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithPadding1<Arb.URI> = {
  padLeft: (length, char) => aS =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) => maxLength,
        ExactLength: ({ exactLength }) => exactLength,
      }),
      length =>
        aS.map(
          flow(
            stripLeftWhile(c => c === char),
            s =>
              s.length > length
                ? s.slice(0, foldUnion(length)(s))
                : s.padStart(foldUnion(length)(s), char),
          ),
        ),
    ),
  padRight: (length, char) => aS =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) => maxLength,
        ExactLength: ({ exactLength }) => exactLength,
      }),
      length =>
        aS.map(
          flow(
            stripRightWhile(c => c === char),
            s =>
              s.length > length
                ? s.slice(0, foldUnion(length)(s))
                : s.padEnd(foldUnion(length)(s), char),
          ),
        ),
    ),
}
