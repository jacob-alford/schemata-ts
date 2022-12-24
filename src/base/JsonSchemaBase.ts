/**
 * Models for JsonSchema as subsets of JSON Schema Draft 4, Draft 6, and Draft 7.
 *
 * @since 1.1.0
 */
import { identity, pipe } from 'fp-ts/function'
import { Const, make } from 'fp-ts/lib/Const'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import { memoize, Schemable1 } from 'io-ts/Schemable'

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Model
 */
type JsonLiteral = JsonString | JsonNumber | JsonBoolean | JsonNull

/**
 * @since 1.1.0
 * @category Model
 */
type JsonSchema_ = JsonLiteral | JsonInteger | JsonStruct | JsonRecord | JsonArray

/**
 * @since 1.1.0
 * @category Model
 */
export type JsonSchema = (JsonSchema_ | JsonUnion) & Description

/**
 * @since 1.1.0
 * @category Model
 */
export interface Description {
  readonly title: string
  readonly description: string
  readonly required: boolean
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonString {
  readonly type = 'string'
  constructor(
    readonly minLength?: number,
    readonly maxLength?: number,
    readonly pattern?: string,
  ) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonNumber {
  readonly type = 'number'
  constructor(readonly minimum?: number, readonly maximum?: number) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonInteger implements Omit<JsonNumber, 'type'> {
  readonly type = 'integer'
  constructor(readonly minimum?: number, readonly maximum?: number) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonBoolean {
  readonly type = 'boolean'
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonStruct {
  readonly type = 'object'
  constructor(readonly properties: Readonly<Record<string, JsonSchema>>) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonRecord {
  readonly type = 'object'
  constructor(readonly additionalProperties: JsonSchema) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonArray {
  readonly type = 'array'
  constructor(
    readonly items: JsonSchema | ReadonlyArray<JsonSchema>,
    readonly minItems?: number,
    readonly maxItems?: number,
  ) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonNull {
  readonly type = 'null'
}

/**
 * @since 1.1.0
 * @category Model
 */
class JsonUnion {
  constructor(readonly oneOf: RNEA.ReadonlyNonEmptyArray<JsonSchema>) {}
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeSchema = (
  schema: JsonSchema_ | JsonUnion,
  description: Description,
): Const<JsonSchema, any> => make<JsonSchema>({ ...schema, ...description })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeStringSchema = (
  minLength?: number,
  maxLength?: number,
  pattern?: string,
): Const<JsonSchema, any> =>
  makeSchema(new JsonString(minLength, maxLength, pattern), {
    title: 'string',
    description: 'A string value',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeNumberSchema = (
  minimum?: number,
  maximum?: number,
): Const<JsonSchema, any> =>
  makeSchema(new JsonNumber(minimum, maximum), {
    title: 'number',
    description: 'A number value',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeIntegerSchema = (
  minimum?: number,
  maximum?: number,
): Const<JsonSchema, any> =>
  makeSchema(new JsonInteger(minimum, maximum), {
    title: 'integer',
    description: 'An integer value',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const booleanSchema: Const<JsonSchema, any> = makeSchema(new JsonBoolean(), {
  title: 'boolean',
  description: 'A boolean value',
  required: true,
})

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeStructSchema = (
  properties: Readonly<Record<string, JsonSchema>>,
): Const<JsonSchema, any> =>
  makeSchema(new JsonStruct(properties), {
    title: 'object',
    description: 'An object value',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeRecordSchema = (
  additionalProperties: JsonSchema,
): Const<JsonSchema, any> =>
  makeSchema(new JsonRecord(additionalProperties), {
    title: 'object',
    description: 'An object value',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeArraySchema = (
  items: JsonSchema,
  minItems?: number,
  maxItems?: number,
): Const<JsonSchema, any> =>
  makeSchema(new JsonArray(items, minItems, maxItems), {
    title: 'array',
    description: 'An array value',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const makeTupleSchema = (
  items: ReadonlyArray<JsonSchema>,
): Const<JsonSchema, any> =>
  makeSchema(new JsonArray(items, items.length, items.length), {
    title: 'tuple',
    description: 'A product of multiple schemata',
    required: true,
  })

/**
 * @since 1.1.0
 * @category Constructors
 */
export const nullSchema = makeSchema(new JsonNull(), {
  title: 'null',
  description: 'An empty value',
  required: true,
})

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
          case 'boolean':
            return booleanSchema
        }
      }),
      schemata =>
        makeSchema(new JsonUnion(schemata), {
          title: 'literal',
          description: 'A union of literal values',
          required: true,
        }),
    ),
  string: makeStringSchema(),
  number: makeNumberSchema(),
  boolean: booleanSchema,
  nullable: schema =>
    makeSchema(new JsonUnion([schema, nullSchema]), {
      title: 'nullable',
      description: 'A nullable value',
      required: true,
    }),
  struct: makeStructSchema,
  partial: properties =>
    makeStructSchema(
      pipe(
        properties as Readonly<Record<string, JsonSchema>>,
        RR.map(({ title, description, ...rest }) =>
          makeSchema(rest, { title, description, required: false }),
        ),
      ),
    ),
  record: makeRecordSchema,
  array: makeArraySchema,
  tuple: (...schemata) => makeTupleSchema(schemata),
  intersect: right => left => {
    // Oh boy
  },
  sum: tag => members => {
    // Todo
  },
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
