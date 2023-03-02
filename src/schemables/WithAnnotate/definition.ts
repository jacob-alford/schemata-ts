/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithAnnotate<S extends SchemableLambda> {
  readonly annotate: (params?: {
    title?: string
    description?: string
  }) => <E, A>(schema: SchemableKind<S, E, A>) => SchemableKind<S, E, A>
}
