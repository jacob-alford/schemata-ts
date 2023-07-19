/**
 * Models for JsonSchema as subsets of JSON Schema Draft 4, Draft 6, and Draft 7.
 *
 * @since 1.2.0
 * @example
 *   import * as JS from 'schemata-ts/JsonSchema'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getJsonSchema } from 'schemata-ts/JsonSchema'
 *
 *   const schema = S.Struct({
 *     id: S.Natural,
 *     jwt: S.Jwt,
 *     tag: S.Literal('Customer'),
 *   })
 *
 *   const jsonSchema = getJsonSchema(schema)
 *
 *   assert.deepStrictEqual(JS.stripIdentity(jsonSchema), {
 *     type: 'object',
 *     required: ['id', 'jwt', 'tag'],
 *     properties: {
 *       id: { type: 'integer', minimum: 0, maximum: 9007199254740991 },
 *       jwt: {
 *         type: 'string',
 *         description: 'Jwt',
 *         pattern:
 *           '^(([A-Za-z0-9_\\x2d]*)\\.([A-Za-z0-9_\\x2d]*)(\\.([A-Za-z0-9_\\x2d]*)){0,1})$',
 *       },
 *       tag: { type: 'string', const: 'Customer' },
 *     },
 *   })
 *
 * @see https://json-schema.org/draft/2020-12/json-schema-validation.html
 */
import { type Const, make } from 'fp-ts/Const'
import { identity } from 'fp-ts/function'
import type * as RR from 'fp-ts/ReadonlyRecord'
import { getJsonSchema as getJsonSchema_ } from 'schemata-ts/derivations/json-schema-schemable'
import {
  type Float,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import * as I from 'schemata-ts/internal/json-schema'
import { type Schema } from 'schemata-ts/Schema'

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------

/**
 * @since 1.2.0
 * @category Model
 */
export type JsonSchemaValue =
  | I.JsonEmpty
  | I.JsonString
  | I.JsonNumber
  | I.JsonBoolean
  | I.JsonNull
  | I.JsonInteger
  | I.JsonConst
  | I.JsonLiteral
  | I.JsonStruct
  | I.JsonArray
  | I.JsonUnion
  | I.JsonIntersection
  | I.JsonRef

/**
 * @since 1.2.0
 * @category Model
 */
export type JsonSchema = JsonSchemaValue & I.Description & I.References

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------

/**
 * Interprets a schema as a JsonSchema projecting into either Draft-07 or 2020-12
 *
 * @since 1.2.0
 */
export const getJsonSchema = <I, O>(
  schema: Schema<I, O>,
  version: 'Draft-07' | '2019-09' | '2020-12' = '2019-09',
  maintainIdentity = false,
): JsonSchema => {
  switch (version) {
    case 'Draft-07':
      // istanbul ignore next
      return (maintainIdentity ? identity : I.stripIdentity)(
        I.as2007(getJsonSchema_(schema)),
      )
    case '2019-09':
      // istanbul ignore next
      return (maintainIdentity ? identity : I.stripIdentity)(getJsonSchema_(schema))
    case '2020-12':
      // istanbul ignore next
      return (maintainIdentity ? identity : I.stripIdentity)(
        I.as2020(getJsonSchema_(schema)),
      )
  }
}

/**
 * @since 1.2.0
 * @category Constructors
 */
export const emptySchema = make(new I.JsonEmpty())

/**
 * @since 1.2.0
 * @category Constructors
 */
export const string = (
  params: {
    minLength?: number
    maxLength?: number
    pattern?: string
    contentEncoding?: string
    contentMediaType?: string
    contentSchema?: JsonSchema
    format?: string
  } = {},
): Const<JsonSchema, string> =>
  make(
    new I.JsonString(
      params.minLength,
      params.maxLength,
      params.pattern,
      params.contentEncoding,
      params.contentMediaType,
      params.contentSchema,
      params.format,
    ),
  )

/**
 * @since 1.2.0
 * @category Constructors
 */
export const number = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params: {
    minimum?: Min
    maximum?: Max
  } = {},
): Const<
  JsonSchema,
  Float<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >
> => make(new I.JsonNumber(params.minimum, params.maximum))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const integer = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params: {
    minimum?: Min
    maximum?: Max
  } = {},
): Const<
  JsonSchema,
  Integer<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >
> => make(new I.JsonInteger(params.minimum, params.maximum))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const booleanSchema: Const<JsonSchema, boolean> = make(new I.JsonBoolean())

/**
 * @since 1.2.0
 * @category Constructors
 */
export const literal = <A extends string | number | boolean | null>(
  value: A,
): Const<JsonSchema, A> =>
  value === null ? make(new I.JsonNull()) : make({ type: typeof value, const: value })

/**
 * @since 1.2.0
 * @category Constructors
 */
export const struct = <A>(
  properties: {
    [K in keyof A]: Const<JsonSchema, A[K]>
  },
  required: ReadonlyArray<string> = [],
  additionalProperties?: JsonSchema | false,
): Const<JsonSchema, A> =>
  make(new I.JsonStruct(properties, required, additionalProperties))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const record = <A>(
  additionalProperties: Const<JsonSchema, A>,
): Const<JsonSchema, Record<string, A>> =>
  make(new I.JsonStruct(new I.JsonEmpty() as any, [], additionalProperties))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const array =
  (params: { minItems?: number; maxItems?: number } = {}) =>
  <A>(items: Const<JsonSchema, A>): Const<JsonSchema, Array<A>> =>
    make(new I.JsonArray(items, params.minItems, params.maxItems))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...items: {
    [K in keyof A]: Const<JsonSchema, A[K]>
  }
): Const<JsonSchema, A> => make(new I.JsonArray(items, items.length, items.length))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const nullSchema = make(new I.JsonNull())

/**
 * @since 1.2.0
 * @category Constructors
 */
export const union = <U extends ReadonlyArray<Const<JsonSchema, unknown>>>(
  ...members: U
): Const<JsonSchema, U[number] extends Const<JsonSchema, infer A> ? A : never> =>
  make(members.length > 1 ? new I.JsonUnion(members) : members[0])

/**
 * @since 1.2.0
 * @category Constructors
 */
export const intersection =
  <B>(right: Const<JsonSchema, B>) =>
  <A>(left: Const<JsonSchema, A>): Const<JsonSchema, A & B> =>
    make(new I.JsonIntersection([left, right]))

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------

/** @since 1.2.0 */
export const URI = 'schemata-ts/JsonSchema'

/** @since 1.2.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface URItoKind2<E, A> {
    readonly JsonSchema: Const<JsonSchema, E>
  }
}

// -------------------------------------------------------------------------------------
// Combintators
// -------------------------------------------------------------------------------------

/**
 * @since 1.2.0
 * @category Combintators
 */
// istanbul ignore next
export const annotate: (params?: {
  readonly title?: string
  readonly description?: string
  readonly references?: RR.ReadonlyRecord<string, JsonSchema>
}) => (schema: JsonSchema) => Const<JsonSchema, never> =
  ({ title, description, references } = {}) =>
  schema =>
    title === undefined && description === undefined && references === undefined
      ? make(schema)
      : make({
          ...schema,
          ...(title === undefined ? {} : { title }),
          ...(description === undefined ? {} : { description }),
          ...(references === undefined ? {} : { $defs: references }),
        })

/**
 * A reference to a schema definition
 *
 * @since 2.0.0
 */
export const ref = <A>(ref: string): Const<JsonSchema, A> => make(new I.JsonRef(ref))

// -------------------------------------------------------------------------------------
// Destructors
// -------------------------------------------------------------------------------------

/**
 * Removes the internal class identities from a `JsonSchema`
 *
 * @since 1.2.0
 * @category Destructors
 */
export const stripIdentity: (schema: JsonSchema) => JsonSchema = I.stripIdentity
