/**
 * Models for JsonSchema as subsets of JSON Schema Draft 4, Draft 6, and Draft 7.
 *
 * @since 1.1.0
 */
import { identity, pipe, unsafeCoerce } from 'fp-ts/function'
import { Const, make } from 'fp-ts/lib/Const'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import { memoize, Schemable1 } from 'io-ts/Schemable'

import { Int } from '../schemables/WithInt/definition'

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Model
 */
export type JsonSchema = (
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonNull
  | JsonInteger
  | JsonStruct
  | JsonRecord
  | JsonArray
  | JsonUnion
  | JsonIntersection
) &
  Description

/** @internal */
interface Description {
  readonly title?: string
  readonly description?: string
  readonly required?: boolean
}

/** @internal */
class JsonString {
  readonly type = 'string'
  constructor(
    readonly minLength?: number,
    readonly maxLength?: number,
    readonly pattern?: string,
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
class JsonStruct {
  readonly type = 'object'
  constructor(readonly properties: Readonly<Record<string, JsonSchema>>) {}
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
 * @since 1.1.0
 * @category Constructors
 */
export const makeSchema = <A>(
  schema: JsonSchema,
  description: Description = {},
): Const<JsonSchema, A> => make<JsonSchema, A>({ ...schema, ...description })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeStringSchema = (
  minLength?: number,
  maxLength?: number,
  pattern?: string,
): Const<JsonSchema, string> =>
  makeSchema(new JsonString(minLength, maxLength, pattern), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeNumberSchema = (
  minimum?: number,
  maximum?: number,
): Const<JsonSchema, number> =>
  makeSchema(new JsonNumber(minimum, maximum), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeIntegerSchema = (
  minimum?: number,
  maximum?: number,
): Const<JsonSchema, Int> =>
  makeSchema(new JsonInteger(minimum, maximum), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const booleanSchema: Const<JsonSchema, boolean> = makeSchema(new JsonBoolean(), {
  required: true,
})

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeStructSchema = <A>(properties: {
  [K in keyof A]: Const<JsonSchema, A[K]>
}): Const<JsonSchema, A> => makeSchema(new JsonStruct(properties), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeRecordSchema = <A>(
  additionalProperties: Const<JsonSchema, A>,
): Const<JsonSchema, Record<string, A>> =>
  makeSchema(new JsonRecord(additionalProperties), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeArraySchema = <A>(
  items: Const<JsonSchema, A>,
  minItems?: number,
  maxItems?: number,
): Const<JsonSchema, Array<A>> =>
  makeSchema(new JsonArray(items, minItems, maxItems), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeTupleSchema = <A extends ReadonlyArray<unknown>>(
  ...items: {
    [K in keyof A]: Const<JsonSchema, A[K]>
  }
): Const<JsonSchema, A> =>
  makeSchema(new JsonArray(items, items.length, items.length), { required: true })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const nullSchema = makeSchema<null>(new JsonNull(), { required: true })

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Instances
 */
export const URI = 'JsonSchema'

/**
 * @since 1.1.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly JsonSchema: Const<JsonSchema, A>
  }
}

/**
 * @since 1.1.0
 * @category Instances
 */
export const Schemable: Schemable1<URI> = {
  URI,
  literal: (...values) =>
    pipe(
      values,
      RNEA.map(literal => {
        if (literal === null) return nullSchema
        switch (typeof literal) {
          case 'string':
            return makeStringSchema()
          case 'number':
            return makeNumberSchema()
          default:
            return booleanSchema
        }
      }),
      schemata => makeSchema(new JsonUnion(schemata)),
    ),
  string: makeStringSchema(),
  number: makeNumberSchema(),
  boolean: booleanSchema,
  nullable: schema => makeSchema(new JsonUnion([schema, nullSchema])),
  struct: makeStructSchema,
  partial: <A>(properties: { [K in keyof A]: Const<JsonSchema, A[K]> }): Const<
    JsonSchema,
    Partial<{ [K in keyof A]: A[K] }>
  > =>
    makeStructSchema<Partial<A>>(
      pipe(
        properties as Readonly<Record<string, JsonSchema>>,
        RR.map(({ title, description, ...rest }) =>
          makeSchema(rest, { title, description, required: false }),
        ),
        a => unsafeCoerce(a),
      ),
    ),
  record: makeRecordSchema,
  array: makeArraySchema,
  // @ts-expect-error -- typelevel difference
  tuple: <A extends ReadonlyArray<unknown>>(
    ...items: { [K in keyof A]: Const<JsonSchema, A[K]> }
  ): Const<JsonSchema, A> => makeTupleSchema<A>(...items),
  intersect: right => left => makeSchema(new JsonIntersection([left, right])),
  sum: () => members =>
    makeSchema(
      new JsonUnion(
        pipe(
          members as Readonly<Record<string, Const<JsonSchema, any>>>,
          RR.collect(Str.Ord)((_, a) => a),
        ),
      ),
    ),
  lazy: (id, f) => {
    const get = memoize<void, JsonSchema>(f)
    return makeSchema(get(), {
      title: id,
      description: `Lazy(${id})`,
      required: true,
    })
  },
  readonly: identity,
}
