import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { Pattern } from 'schemata-ts/PatternBuilder'

export interface WithPattern<S extends SchemableLambda> {
  readonly pattern: (
    pattern: Pattern,
    name: string,
    caseInsensitive?: boolean,
  ) => SchemableKind<S, string, string>
}
