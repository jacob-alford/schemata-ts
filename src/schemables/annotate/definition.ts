import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithAnnotate<S extends SchemableLambda> {
  readonly annotate: (params?: {
    title?: string
    description?: string
  }) => <E, A>(schema: SchemableKind<S, E, A>) => SchemableKind<S, E, A>
}
