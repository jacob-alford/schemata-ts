import { Const, make as make_ } from 'fp-ts/Const'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as hkt from 'schemata-ts/HKT'

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

export type JsonSchema = JsonSchemaValue & Description

export interface Description {
  readonly title?: string
  readonly description?: string
}

export const make: <A>(value: JsonSchemaValue) => Const<JsonSchema, A> = make_

/** @internal */
export const addDescription =
  (description?: Description) =>
  <A>(schema: Const<JsonSchema, A>): Const<JsonSchema, A> =>
    make_(Object.assign({}, schema, description ?? {}))

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
