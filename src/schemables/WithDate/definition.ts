import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithDate<S extends SchemableLambda> {
  readonly date: SchemableKind<S, Date, Date>
  readonly dateFromString: SchemableKind<S, string, Date>
}
