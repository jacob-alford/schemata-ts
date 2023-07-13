import { type Pattern } from 'kuvio'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithPattern<S extends SchemableLambda> {
  readonly pattern: (
    pattern: Pattern,
    name: string | readonly [string, string],
    caseInsensitive?: boolean,
  ) => SchemableKind<S, string, string>
}
