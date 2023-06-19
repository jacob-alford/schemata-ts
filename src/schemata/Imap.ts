/** @since 1.0.0 */
import * as G from 'schemata-ts/internal/guard'
import { make, Schema } from 'schemata-ts/Schema'

/**
 * A Schema that maps the output type of another Schema. Guard is not invariant, and
 * `Imap` requires an explicit guard for the output type.
 *
 * @since 1.0.0
 * @category Schema
 */
export const Imap =
  <A, B>(targetGuard: G.Guard<B>, f: (a: A) => B, g: (b: B) => A) =>
  <I>(target: Schema<I, A>): Schema<I, B> =>
    make(S => S.imap(targetGuard)(f, g)(target.runSchema(S)))
