import type * as RR from 'fp-ts/ReadonlyRecord'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/HKT'
import { type JsonSchema } from 'schemata-ts/internal/json-schema'

export interface WithAnnotate<S extends SchemableLambda> {
  readonly annotate: (params?: {
    readonly title?: string
    readonly description?: string
    readonly references?: RR.ReadonlyRecord<string, JsonSchema>
  }) => <E, A>(schema: SchemableKind<S, E, A>) => SchemableKind<S, E, A>
}
