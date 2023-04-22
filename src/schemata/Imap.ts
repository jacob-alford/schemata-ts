/**
 * Schemable for lossless mapping the output type of a Schema. Formerly Invariant
 *
 * @since 1.0.0
 */
import { getGuard } from 'schemata-ts/derivations/GuardSchemable'
import * as SC from 'schemata-ts/Schema'

/**
 * Schemable for lossless mapping the output type of a Schema. Formerly Invariant
 *
 * @since 1.0.0
 * @category Schema
 */
export const Imap =
  <A, B>(newName: string, f: (a: A) => B, g: (b: B) => A) =>
  <I>(target: SC.Schema<I, A>): SC.Schema<I, B> =>
    SC.make(S => S.imap(getGuard(target), newName)(f, g)(target(S)))
