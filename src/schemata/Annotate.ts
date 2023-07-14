/** @since 1.2.0 */
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import { getJsonSchema } from 'schemata-ts/derivations/json-schema-schemable'
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
 * @example
 *   import { pipe } from 'fp-ts/function'
 *   import * as S from 'schemata-ts'
 *   import * as JS from 'schemata-ts/JsonSchema'
 *   import { Schema } from 'schemata-ts/Schema'
 *
 *   type One = {
 *     two: Two
 *   }
 *
 *   type Two = {
 *     one?: One | null
 *   }
 *
 *   const One_: Schema<One, One> = S.Struct({
 *     two: S.Lazy('two', () => Two_),
 *   })
 *
 *   const Two_ = S.Struct({
 *     one: S.Nullable(S.Lazy('one', () => One_)),
 *   })
 *
 *   const One = pipe(
 *     One_,
 *     S.Annotate({
 *       references: {
 *         one: One_,
 *         two: Two_,
 *       },
 *     }),
 *   )
 *
 *   const Two = pipe(
 *     Two_,
 *     S.Annotate({
 *       references: {
 *         one: One_,
 *         two: Two_,
 *       },
 *     }),
 *   )
 *
 *   const jsonSchemaOne = JS.getJsonSchema(One)
 *   const jsonSchemaTwo = JS.getJsonSchema(Two)
 *
 *   assert.deepStrictEqual(JS.stripIdentity(jsonSchemaOne), {
 *     properties: {
 *       two: {
 *         $ref: 'two',
 *       },
 *     },
 *     required: ['two'],
 *     type: 'object',
 *     $defs: {
 *       one: {
 *         properties: {
 *           two: {
 *             $ref: 'two',
 *           },
 *         },
 *         required: ['two'],
 *         type: 'object',
 *       },
 *       two: {
 *         properties: {
 *           one: {
 *             oneOf: [
 *               {
 *                 type: 'null',
 *                 const: null,
 *               },
 *               {
 *                 $ref: 'one',
 *               },
 *             ],
 *           },
 *         },
 *         required: [],
 *         type: 'object',
 *       },
 *     },
 *   })
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
      RR.map(getJsonSchema),
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
