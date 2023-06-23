import type * as Ord from 'fp-ts/Ord'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithMap<S extends SchemableLambda> {
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: SchemableKind<S, EK, K>,
    sa: SchemableKind<S, EA, A>,
  ) => SchemableKind<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>
}
