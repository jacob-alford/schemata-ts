import type * as G from 'schemata-ts/internal/guard'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithInvariant<S extends SchemableLambda> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<B>,
    newName?: string,
  ) => <A>(
    f: (a: A) => B,
    g: (b: B) => A,
  ) => <O>(target: SchemableKind<S, O, A>) => SchemableKind<S, O, B>
}
