/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Models for JsonSchema as subsets of JSON Schema Draft 4, Draft 6, and Draft 7.
 *
 * @since 1.2.0
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
  | JsonLiteral
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
type JsonLiteral =
  | {
      readonly type: 'string'
      readonly const: string
    }
  | {
      readonly type: 'number'
      readonly const: number
    }
  | {
      readonly type: 'boolean'
      readonly const: boolean
    }
  | {
      readonly type: 'null'
      readonly const: null
    }

/** @internal */
class JsonStruct {
  readonly type = 'object'
  constructor(
    readonly properties: Readonly<Record<string, JsonSchema>>,
    readonly required: ReadonlyArray<string> = [],
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
  make(new JsonUnion(members))

/**
 * @since 1.2.0
 * @category Combintators
 */
export const annotate: (
  name?: string,
  description?: string,
) => (schema: JsonSchema) => Const<JsonSchemaWithDescription, never> =
  (name, description) => schema =>
    make({
      ...schema,
      name,
      description,
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
    pipe(values, RNEA.map(makeLiteralSchema), schemata => make(new JsonUnion(schemata))),
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
      new JsonUnion(
        pipe(
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
