import * as Ord from 'fp-ts/Ord'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithMap<S extends SchemableLambda> {
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: SchemableKind<S, EK, K>,
    sa: SchemableKind<S, EA, A>,
  ) => SchemableKind<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>
}
