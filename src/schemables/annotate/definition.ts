import type * as RR from 'fp-ts/ReadonlyRecord'
import { type JsonSchema } from 'schemata-ts/internal/json-schema'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithAnnotate<S extends SchemableLambda> {
  readonly annotate: (params: {
    readonly title?: string
    readonly description?: string
    readonly references?: RR.ReadonlyRecord<string, JsonSchema>
    readonly typeString?: string | readonly [string, string]
    readonly readOnly?: boolean
    readonly deprecated?: boolean
  }) => <E, A>(schema: SchemableKind<S, E, A>) => SchemableKind<S, E, A>
}
