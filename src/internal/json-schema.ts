import { type Const, make as make_ } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { type Endomorphism } from 'fp-ts/Endomorphism'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import type * as hkt from 'schemata-ts/internal/schemable'
import { hasOwn } from 'schemata-ts/internal/util'

export type JsonSchemaValue =
  | JsonEmpty
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonNull
  | JsonInteger
  | JsonConst
  | JsonLiteral
  | JsonStruct
  | JsonArray
  | JsonUnion
  | JsonIntersection
  | JsonRef

export type JsonSchema = JsonSchemaValue & Description & References & Default

export interface Description {
  readonly title?: string
  readonly description?: string
  readonly readOnly?: boolean
  readonly deprecated?: boolean
}

export interface References {
  readonly $defs?: RR.ReadonlyRecord<string, JsonSchema>
}

export interface Default {
  readonly default?: unknown
}

export const make: <A>(value: JsonSchemaValue) => Const<JsonSchema, A> = make_

/** @internal */
export const addDescription =
  (description: Description) =>
  <A>(schema: Const<JsonSchema, A>): Const<JsonSchema, A> =>
    make_(Object.assign({}, schema, description))

/** @internal */
export const addReferences =
  (references: References) =>
  <A>(schema: Const<JsonSchema, A>): Const<JsonSchema, A> =>
    make_(Object.assign({}, schema, references))

/** @internal */
export const addDefault =
  (defaultValue: unknown) =>
  <A>(schema: Const<JsonSchema, A>): Const<JsonSchema, A> =>
    make_(Object.assign({}, schema, { default: defaultValue }))

/** Matches anything */
export class JsonEmpty {}

/** Matches a subset of strings */
export class JsonString {
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

/** Matches a subset of floats */
export class JsonNumber {
  readonly type = 'number'
  constructor(readonly minimum?: number, readonly maximum?: number) {}
}

/** Matches a subset of integers */
export class JsonInteger implements Omit<JsonNumber, 'type'> {
  readonly type = 'integer'
  constructor(readonly minimum?: number, readonly maximum?: number) {}
}

/** Matches true or false */
export class JsonBoolean {
  readonly type = 'boolean'
}

/** Matches a constant value */
export class JsonConst {
  readonly const: unknown
}

/** Matches a boolean, number, string, or null constant value */
export type JsonLiteral = (JsonBoolean | JsonNumber | JsonString | JsonNull) & JsonConst

/** Matches a set of properties with a given set of required properties. */
export class JsonStruct {
  readonly type = 'object'
  constructor(
    readonly properties: Readonly<Record<string, JsonSchema>>,
    readonly required: ReadonlyArray<string>,
    readonly additionalProperties?: JsonSchema | false,
    readonly propertyNames?: JsonSchema,
  ) {}
}

/** Matches a subset of arrays with uniform index values (or specific index values) */
export class JsonArray {
  readonly type = 'array'
  constructor(
    readonly items: JsonSchema | ReadonlyArray<JsonSchema>,
    readonly minItems?: number,
    readonly maxItems?: number,
  ) {}
}

/** Matches null exactly */
export class JsonNull {
  readonly type = 'null'
  readonly const = null
}

/** Matches any of the supplied schemas */
export class JsonUnion {
  constructor(readonly anyOf: ReadonlyArray<JsonSchema>) {}
}

/** Matches all of the supplied schemas */
export class JsonIntersection {
  constructor(readonly allOf: RNEA.ReadonlyNonEmptyArray<JsonSchema>) {}
}

/**
 * A reference to a named schema definition
 *
 * @since 2.0.0
 */
export class JsonRef {
  constructor(readonly $ref: string) {}
}

/** @internal */
export const stripIdentity = (schema: JsonSchema): JsonSchema =>
  JSON.parse(JSON.stringify(schema))

export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Const<JsonSchema, this['Input']>
}

/** @internal */
// istanbul ignore next
class References_ implements References {
  constructor(readonly $defs: RR.ReadonlyRecord<string, JsonSchema>) {}
}

// -----------------
// Json Remapping
// -----------------

type JsonRemapper = Endomorphism<Endomorphism<JsonSchema>>

/** Plucks a key from a struct and remaps it while also remapping the rest of the struct */
const recurseKeyOf = <JS extends JsonSchema, K extends keyof JS>(
  _: new (...args: ReadonlyArray<any>) => JS,
  key: K,
  mapper: (
    method: (schema: JsonSchema) => JsonSchema,
  ) => (
    schema: NonNullable<JS[K]>,
  ) => E.Either<
    readonly [remapped: NonNullable<JS[K]>, inject?: JsonSchema],
    readonly [key: string, remapped: NonNullable<JS[K]>, inject?: JsonSchema]
  >,
): JsonRemapper => {
  return method => schema => {
    if (!hasOwn(schema, key) || (schema as any)[key] === undefined) {
      return schema
    }
    const { [key]: value, ...rest } = schema
    const result = mapper(method)(value as any)
    if (E.isRight(result)) {
      const [newKey, _, inject] = result.right
      return Object.assign({}, method(rest), { [newKey]: _ }, inject)
    }
    const [_, inject] = result.left
    return Object.assign({}, method(rest), { [key]: _ }, inject)
  }
}

const foldDefault: JsonRemapper = method => schema => method(schema)
const foldDefaultLeft = (method: Endomorphism<JsonSchema>) =>
  flow(foldDefault(method), tuple, E.left)

// -----------------
// Json Remappers
// -----------------

const remapContentSchema: JsonRemapper = recurseKeyOf(
  JsonString,
  'contentSchema',
  foldDefaultLeft,
)
const remapProperties: JsonRemapper = recurseKeyOf(JsonStruct, 'properties', method =>
  flow(RR.map(method), tuple, E.left),
)
const remapAdditionalProperties: JsonRemapper = recurseKeyOf(
  JsonStruct,
  'additionalProperties',
  foldDefaultLeft,
)
const remapPropertyNames: JsonRemapper = recurseKeyOf(
  JsonStruct,
  'propertyNames',
  foldDefaultLeft,
)
const remapItems: JsonRemapper = recurseKeyOf(
  JsonArray,
  'items',
  method => items =>
    E.left(tuple(Array.isArray(items) ? items.map(method) : method(items))),
)
const remapAnyOf: JsonRemapper = recurseKeyOf(JsonUnion, 'anyOf', _ =>
  flow(RA.map(_), tuple, E.left),
)
const remapAllOf: JsonRemapper = recurseKeyOf(JsonIntersection, 'allOf', _ =>
  flow(RNEA.map(_), tuple, E.left),
)
const remapDefs: JsonRemapper = recurseKeyOf(References_, '$defs', _ =>
  flow(RR.map(_), tuple, E.left),
)

// ---------------------
// Json Schema Draft-07
// ---------------------

/** @internal */
export const asDraft07: (schema: JsonSchema) => JsonSchema = schema =>
  pipe(schema, defsToDefinitions(asDraft07), recurseDraft07)

const defsToDefinitions = recurseKeyOf(References_, '$defs', () =>
  flow(RR.map(asDraft07), _ => E.right(tuple('definitions', _))),
)

const recurseDraft07 = flow(
  remapContentSchema(asDraft07),
  remapProperties(asDraft07),
  remapAdditionalProperties(asDraft07),
  remapPropertyNames(asDraft07),
  remapItems(asDraft07),
  remapAnyOf(asDraft07),
  remapAllOf(asDraft07),
)

// ---------------------
// Json Schema 2020-12
// ---------------------

/** @internal */
export const as2020: (schema: JsonSchema) => JsonSchema = schema =>
  pipe(schema, itemsToPrefixItems(as2020), recurse2020)

const itemsToPrefixItems = recurseKeyOf(
  JsonArray,
  'items',
  () => schema =>
    Array.isArray(schema)
      ? E.right(tuple('prefixItems', schema.map(as2020), { items: false }))
      : E.left(tuple(as2020(schema))),
)

const recurse2020 = flow(
  remapDefs(as2020),
  remapContentSchema(as2020),
  remapProperties(as2020),
  remapAdditionalProperties(as2020),
  remapPropertyNames(as2020),
  remapAnyOf(as2020),
  remapAllOf(as2020),
)
