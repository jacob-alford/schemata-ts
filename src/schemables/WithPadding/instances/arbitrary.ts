/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import { flow, pipe } from 'fp-ts/function'
import * as Arb from 'schemata-ts/Arbitrary'
import { WithPadding1 } from 'schemata-ts/schemables/WithPadding/definition'
import {
  foldUnion,
  match,
  stripLeftWhile,
  stripRightWhile,
} from 'schemata-ts/schemables/WithPadding/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithPadding1<Arb.URI> = {
  padLeft: (length, char) => aS => ({
    arbitrary: fc =>
      pipe(
        length,
        match({
          MaxLength: ({ maxLength }) => maxLength,
          ExactLength: ({ exactLength }) => exactLength,
        }),
        length =>
          aS.arbitrary(fc).map(
            flow(
              stripLeftWhile(c => c === char),
              s =>
                s.length > length
                  ? s.slice(0, foldUnion(length)(s))
                  : s.padStart(foldUnion(length)(s), char),
            ),
          ),
      ),
  }),
  padRight: (length, char) => aS => ({
    arbitrary: fc =>
      pipe(
        length,
        match({
          MaxLength: ({ maxLength }) => maxLength,
          ExactLength: ({ exactLength }) => exactLength,
        }),
        length =>
          aS.arbitrary(fc).map(
            flow(
              stripRightWhile(c => c === char),
              s =>
                s.length > length
                  ? s.slice(0, foldUnion(length)(s))
                  : s.padEnd(foldUnion(length)(s), char),
            ),
          ),
      ),
  }),
}
