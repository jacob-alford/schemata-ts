/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInvariant<S extends SchemableLambda> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<B>,
    name: string,
  ) => <A>(
    f: (a: A) => B,
    g: (b: B) => A,
  ) => <O>(target: SchemableKind<S, O, A>) => SchemableKind<S, O, B>
}
