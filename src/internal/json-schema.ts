import { type Const, make as make_ } from 'fp-ts/Const'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import type * as RR from 'fp-ts/ReadonlyRecord'
import type * as hkt from 'schemata-ts/HKT'

export type JsonSchemaValue =
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
  | JsonArray
  | JsonUnion
  | JsonIntersection
  | JsonRef

export type JsonSchema = JsonSchemaValue & Description & References

export interface Description {
  readonly title?: string
  readonly description?: string
}

export interface References {
  readonly $defs?: RR.ReadonlyRecord<string, JsonSchema>
}

export const make: <A>(value: JsonSchemaValue) => Const<JsonSchema, A> = make_

/** @internal */
export const addDescription =
  (description?: Description) =>
  <A>(schema: Const<JsonSchema, A>): Const<JsonSchema, A> =>
    make_(Object.assign({}, schema, description ?? {}))

/** @internal */
export const addReferences =
  (references?: References) =>
  <A>(schema: Const<JsonSchema, A>): Const<JsonSchema, A> =>
    make_(Object.assign({}, schema, references ?? {}))

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

/** Negates a schema */
export class JsonExclude {
  constructor(readonly not: JsonSchema) {}
}

/** Matches any of the supplied schemas */
export class JsonUnion {
  constructor(readonly oneOf: ReadonlyArray<JsonSchema>) {}
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
export const stripIdentity = <A>(schema: Const<JsonSchema, A>): JsonSchema =>
  JSON.parse(JSON.stringify(schema))

/** @since 1.2.0 */
export const URI = 'JsonSchema'

/** @since 1.2.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface URItoKind2<E, A> {
    readonly JsonSchema: Const<JsonSchema, E>
  }
}

export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Const<JsonSchema, this['Input']>
}
