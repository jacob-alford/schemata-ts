/** @since 1.0.0 */
import type * as G from 'schemata-ts/internal/guard'
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * A Schema that maps the output type of another Schema. Guard is not invariant, and
 * `Imap` requires an explicit guard for the output type.
 *
 * @since 1.0.0
 * @category Mapping
 */
export const Imap =
  <A, B>(targetGuard: G.Guard<B>, f: (a: A) => B, g: (b: B) => A, newName?: string) =>
  <I>(target: Schema<I, A>): Schema<I, B> =>
    make(S => S.imap(targetGuard, newName)(f, g)(target.runSchema(S)))
