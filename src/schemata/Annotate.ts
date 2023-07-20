/** @since 1.2.0 */
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import { deriveJsonSchema } from 'schemata-ts/derivations/json-schema-schemable'
import type * as JS from 'schemata-ts/internal/json-schema'
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * Annotate a Json Schema with title, description, and references.
 *
 * Note: references must be specified for all "Lazy" schemas, and must occur after the
 * declaration of the primary schema. This is because Lazy for json-schema is implemented
 * as a ref, and that ref must be specified in the parent using `Annotate`
 *
 * @since 1.2.0
 * @category Combinators
 */
export const Annotate =
  <Refs extends RR.ReadonlyRecord<string, Schema<any, any>>>(params: {
    readonly title?: string
    readonly description?: string
    readonly references?: Refs
    readonly typeString?: string | readonly [string, string]
    readonly readOnly?: boolean
  }) =>
  <O, A>(schema: Schema<O, A>): Schema<O, A> => {
    const { references = {} } = params
    const mappedRefs: RR.ReadonlyRecord<string, JS.JsonSchema> = pipe(
      references as Refs,
      RR.map(deriveJsonSchema),
    )
    return make(s =>
      s.annotate({
        ...(params.title === undefined ? {} : { title: params.title }),
        ...(params.description === undefined ? {} : { description: params.description }),
        ...(params.references === undefined ? {} : { references: mappedRefs }),
        ...(params.typeString === undefined ? {} : { typeString: params.typeString }),
        ...(params.readOnly === undefined ? {} : { readOnly: params.readOnly }),
      })(schema.runSchema(s)),
    )
  }
