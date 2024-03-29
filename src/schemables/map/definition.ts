import type * as Ord from 'fp-ts/Ord'
import { type Semigroup } from 'fp-ts/Semigroup'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithMap<S extends SchemableLambda> {
  readonly mapFromEntries: <EK, EA, K extends EK, A>(
    ordEK: Ord.Ord<K>,
    sk: SchemableKind<S, EK, K>,
    sa: SchemableKind<S, EA, A>,
    expectedName: string,
    combineKeys: Semigroup<A>,
  ) => SchemableKind<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>
}
