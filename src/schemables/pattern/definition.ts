import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { type Pattern } from 'schemata-ts/PatternBuilder'

export interface WithPattern<S extends SchemableLambda> {
  readonly pattern: (
    pattern: Pattern,
    name: string,
    caseInsensitive?: boolean,
  ) => SchemableKind<S, string, string>
}
