/**
 * Models for JsonSchema as subsets of JSON Schema Draft 4, Draft 6, and Draft 7.
 *
 * @since 1.2.0
 * @see https://json-schema.org/draft/2020-12/json-schema-validation.html
 */
import { identity, pipe } from 'fp-ts/function'
import { Const, make } from 'fp-ts/lib/Const'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import { memoize } from 'io-ts/Schemable'

import { Int } from '../schemables/WithInt/definition'
import { Schemable2 } from './SchemableBase'

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------

/**
 * @since 1.2.0
 * @category Model
 */
export type JsonSchema =
  | JsonEmpty
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonNull
  | JsonInteger
  | JsonConst
  | JsonLiteral
  | JsonExclude
  | JsonStruct
  | JsonRecord
  | JsonArray
  | JsonUnion
  | JsonIntersection

/**
 * @since 1.2.0
 * @category Model
 */
export type JsonSchemaWithDescription = JsonSchema & Description

/** @internal */
interface Description {
  readonly title?: string
  readonly description?: string
}

/** @internal */
class JsonEmpty {}

/** @internal */
class JsonString {
  readonly type = 'string'
  constructor(
    readonly minLength?: number,
    readonly maxLength?: number,
    readonly pattern?: string,
    readonly contentEncoding?: string,
    readonly contentMediaType?: string,
    readonly contentSchema?: JsonSchema,
    readonly format?: string,
  ) {}
}

/** @internal */
class JsonNumber {
  readonly type = 'number'
  constructor(readonly minimum?: number, readonly maximum?: number) {}
}

/** @internal */
class JsonInteger implements Omit<JsonNumber, 'type'> {
  readonly type = 'integer'
  constructor(readonly minimum?: number, readonly maximum?: number) {}
}

/** @internal */
class JsonBoolean {
  readonly type = 'boolean'
}

/** @internal */
interface JsonConst {
  readonly const: unknown
}

/** @internal */
type JsonLiteral = (JsonBoolean | JsonNumber | JsonString | JsonNull) & JsonConst

/** @internal */
class JsonStruct {
  readonly type = 'object'
  constructor(
    readonly properties: Readonly<Record<string, JsonSchema>>,
    readonly required: ReadonlyArray<string>,
  ) {}
}

/** @internal */
class JsonRecord {
  readonly type = 'object'
  constructor(readonly additionalProperties: JsonSchema) {}
}

/** @internal */
class JsonArray {
  readonly type = 'array'
  constructor(
    readonly items: JsonSchema | ReadonlyArray<JsonSchema>,
    readonly minItems?: number,
    readonly maxItems?: number,
  ) {}
}

/** @internal */
class JsonNull {
  readonly type = 'null'
  readonly const = null
}

/** @internal */
class JsonExclude {
  constructor(readonly not: JsonSchema) {}
}

/** @internal */
class JsonUnion {
  constructor(readonly oneOf: ReadonlyArray<JsonSchema>) {}
}

/** @internal */
class JsonIntersection {
  constructor(readonly allOf: RNEA.ReadonlyNonEmptyArray<JsonSchema>) {}
}

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/** @internal */
const hasType = (
  type: string,
  u: JsonSchema,
): u is JsonSchema & { readonly type: string } => 'type' in u && u.type === type

/** @internal */
const hasKey = <K extends string>(
  key: K,
  u: JsonSchema,
): u is JsonSchema & { readonly [key in K]: unknown } => key in u

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonEmpty = (u: JsonSchema): u is JsonEmpty =>
  u instanceof JsonEmpty || Object.keys(u).length === 0

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonString = (u: JsonSchema): u is JsonString =>
  u instanceof JsonString || hasType('string', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonNumber = (u: JsonSchema): u is JsonNumber =>
  u instanceof JsonNumber || hasType('number', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonNull = (u: JsonSchema): u is JsonNull =>
  u instanceof JsonNull || hasType('null', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonInteger = (u: JsonSchema): u is JsonInteger =>
  u instanceof JsonInteger || hasType('integer', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonBoolean = (u: JsonSchema): u is JsonBoolean =>
  u instanceof JsonBoolean || hasType('boolean', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonConst = (u: JsonSchema): u is JsonConst => 'const' in u

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonPrimitive = (u: JsonSchema): u is JsonLiteral | JsonNull =>
  isJsonNull(u) || isJsonBoolean(u) || isJsonNumber(u) || isJsonString(u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonLiteral = (u: JsonSchema): u is JsonLiteral =>
  isJsonConst(u) && isJsonPrimitive(u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonStruct = (u: JsonSchema): u is JsonStruct =>
  u instanceof JsonStruct ||
  (hasType('object', u) && hasKey('properties', u) && hasKey('required', u))

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonRecord = (u: JsonSchema): u is JsonRecord =>
  u instanceof JsonRecord || (hasType('object', u) && hasKey('additionalProperties', u))

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonArray = (u: JsonSchema): u is JsonArray =>
  u instanceof JsonArray || hasType('array', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonExclude = (u: JsonSchema): u is JsonExclude =>
  isJsonIntersection(u) &&
  (RNEA.head(u.allOf) instanceof JsonExclude || hasKey('not', RNEA.head(u.allOf))) &&
  u.allOf.length === 2 &&
  isJsonConst((RNEA.head(u.allOf) as JsonExclude).not)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonUnion = (u: JsonSchema): u is JsonUnion =>
  u instanceof JsonUnion || hasKey('oneOf', u)

/**
 * @since 1.2.0
 * @category Guards
 */
export const isJsonIntersection = (u: JsonSchema): u is JsonIntersection =>
  u instanceof JsonIntersection || hasKey('allOf', u)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.2.0
 * @category Constructors
 */
export const emptySchema = make(new JsonEmpty())

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeStringSchema = (
  minLength?: number,
  maxLength?: number,
  pattern?: string,
  contentEncoding?: string,
  contentMediaType?: string,
  contentSchema?: JsonSchema,
  format?: string,
): Const<JsonSchema, string> =>
  make(
    new JsonString(
      minLength,
      maxLength,
      pattern,
      contentEncoding,
      contentMediaType,
      contentSchema,
      format,
    ),
  )

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeNumberSchema = (
  minimum?: number,
  maximum?: number,
): Const<JsonSchema, number> => make(new JsonNumber(minimum, maximum))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeIntegerSchema = (
  minimum?: number,
  maximum?: number,
): Const<JsonSchema, Int> => make(new JsonInteger(minimum, maximum))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const booleanSchema: Const<JsonSchema, boolean> = make(new JsonBoolean())

/**
 * This is internal because it's not technically accurate to say: `forall value. const:
 * value` is a valid json schema. However, internally, the only usage is with
 * OptionFromExclude which is likely to stick with valid JSON types
 *
 * @internal
 */
export const makeConstSchema = <A>(value: A): Const<JsonSchema, A> =>
  make({ const: value })

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeLiteralSchema = <A extends string | number | boolean | null>(
  value: A,
): Const<JsonSchema, A> =>
  value === null ? make(new JsonNull()) : make({ type: typeof value, const: value })

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeStructSchema = <A>(
  properties: {
    [K in keyof A]: Const<JsonSchema, A[K]>
  },
  required: ReadonlyArray<string> = [],
): Const<JsonSchema, A> => make(new JsonStruct(properties, required))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeRecordSchema = <A>(
  additionalProperties: Const<JsonSchema, A>,
): Const<JsonSchema, Record<string, A>> => make(new JsonRecord(additionalProperties))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeArraySchema = <A>(
  items: Const<JsonSchema, A>,
  minItems?: number,
  maxItems?: number,
): Const<JsonSchema, Array<A>> => make(new JsonArray(items, minItems, maxItems))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeTupleSchema = <A extends ReadonlyArray<unknown>>(
  ...items: {
    [K in keyof A]: Const<JsonSchema, A[K]>
  }
): Const<JsonSchema, A> => make(new JsonArray(items, items.length, items.length))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const nullSchema = make(new JsonNull())

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeUnionSchema = <U extends ReadonlyArray<Const<JsonSchema, unknown>>>(
  ...members: U
): Const<JsonSchema, U[number] extends Const<JsonSchema, infer A> ? A : never> =>
  make(members.length > 1 ? new JsonUnion(members) : members[0])

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeIntersectionSchema = <A, B>(
  left: Const<JsonSchema, A>,
  right: Const<JsonSchema, B>,
): Const<JsonSchema, A & B> => make(new JsonIntersection([left, right]))

/**
 * @since 1.2.0
 * @category Constructors
 */
export const makeExclusionSchema = <A, Z extends A>(
  exclude: Z,
  schema: Const<JsonSchema, A>,
): Const<JsonSchema, Exclude<A, Z>> =>
  make(new JsonIntersection([new JsonExclude(makeConstSchema(exclude)), schema]))

/**
 * @since 1.2.0
 * @category Combintators
 */
export const annotate: (
  title?: string,
  description?: string,
) => (schema: JsonSchema) => Const<JsonSchemaWithDescription, never> =
  (title, description) => schema =>
    title === undefined && description === undefined
      ? make(schema)
      : make({
          ...schema,
          ...(title === undefined ? {} : { title }),
          ...(description === undefined ? {} : { description }),
        })

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.2.0
 * @category Instances
 */
export const URI = 'JsonSchema'

/**
 * @since 1.2.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface URItoKind2<E, A> {
    readonly JsonSchema: Const<JsonSchemaWithDescription, E>
  }
}

/**
 * @since 1.2.0
 * @category Instances
 */
export const Schemable: Schemable2<URI> = {
  URI,
  literal: (...values) =>
    pipe(values, RNEA.map(makeLiteralSchema), schemata =>
      make(schemata.length === 1 ? RNEA.head(schemata) : new JsonUnion(schemata)),
    ),
  string: makeStringSchema(),
  number: makeNumberSchema(),
  boolean: booleanSchema,
  nullable: schema => make(new JsonUnion([schema, nullSchema])),
  // @ts-expect-error -- typelevel difference
  struct: s => makeStructSchema(s, Object.keys(s)),
  // @ts-expect-error -- typelevel difference
  partial: makeStructSchema,
  record: makeRecordSchema,
  array: makeArraySchema,
  // @ts-expect-error -- typelevel difference
  tuple: <A extends ReadonlyArray<unknown>>(
    ...items: { [K in keyof A]: Const<JsonSchema, A[K]> }
  ): Const<JsonSchema, A> => makeTupleSchema<A>(...items),
  intersect: right => left => make(new JsonIntersection([left, right])),
  sum: () => members =>
    make(
      makeUnionSchema(
        ...pipe(
          members as Readonly<Record<string, Const<JsonSchema, any>>>,
          RR.collect(Str.Ord)((_, a) => a),
        ),
      ),
    ),
  lazy: (_, f) => {
    const get = memoize<void, JsonSchema>(f)
    return make(get())
  },
  readonly: identity,
}
