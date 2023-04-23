import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import * as G from 'schemata-ts/internal/guard'

export interface WithInvariant<S extends SchemableLambda> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<B>,
  ) => <A>(
    f: (a: A) => B,
    g: (b: B) => A,
  ) => <O>(target: SchemableKind<S, O, A>) => SchemableKind<S, O, B>
}
