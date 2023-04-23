/** @since 1.0.0 */
import * as G from 'schemata-ts/internal/guard'
import * as SC from 'schemata-ts/Schema'

/**
 * A Schema that maps the output type of another Schema. Guard is not invariant, and
 * `Imap` requires an explicit guard for the output type.
 *
 * @since 1.0.0
 * @category Schema
 */
export const Imap =
  <A, B>(targetGuard: G.Guard<B>, f: (a: A) => B, g: (b: B) => A) =>
  <I>(target: SC.Schema<I, A>): SC.Schema<I, B> =>
    SC.make(S => S.imap(targetGuard)(f, g)(target(S)))
