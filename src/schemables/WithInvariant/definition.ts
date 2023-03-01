/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInvariant<S extends TypeLambda> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string,
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => <O>(target: Kind<S, O, A>) => Kind<S, O, B>
}
