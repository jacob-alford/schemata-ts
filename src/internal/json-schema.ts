import { type Const, make as make_ } from 'fp-ts/Const'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import type * as hkt from 'schemata-ts/internal/schemable'

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

const remapRecurse: (
  method: (schema: JsonSchema) => JsonSchema,
  defs?: '$defs' | 'definitions',
) => (schema: JsonSchema) => JsonSchema = method => schema => {
  if ('contentSchema' in schema) {
    const { contentSchema, ...rest } = schema
    return {
      ...method(rest),
      contentSchema: contentSchema === undefined ? undefined : method(contentSchema),
    }
  }
  if (schema instanceof JsonStruct || 'properties' in schema) {
    const mapped: Record<string, JsonSchema> = {}
    const { properties, additionalProperties, ...rest } = schema as JsonStruct
    const keySchema = (schema as JsonStruct).propertyNames
    for (const key in properties) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inner = properties[key]!
      mapped[key] = method(inner)
    }
    return {
      ...method(rest),
      properties: mapped,
      ...(additionalProperties === undefined
        ? {}
        : {
            additionalProperties:
              additionalProperties === false ? false : method(additionalProperties),
          }),
      // istanbul ignore next
      ...(keySchema === undefined ? {} : { propertyNames: method(keySchema) }),
    }
  }
  if (schema instanceof JsonArray || 'items' in schema) {
    const { items, ...rest } = schema as JsonArray
    if (Array.isArray(items)) {
      const mapped: Array<JsonSchema> = []
      for (const item of items as ReadonlyArray<JsonSchema>) {
        mapped.push(method(item))
      }
      return { ...method(rest), items: mapped }
    }
    return { ...method(rest), items: method(items) }
  }
  if (schema instanceof JsonUnion || 'anyOf' in schema) {
    const { anyOf, ...rest } = schema
    const mapped: Array<JsonSchema> = []
    for (const item of anyOf as ReadonlyArray<JsonSchema>) {
      mapped.push(method(item))
    }
    return { ...method(rest), anyOf: mapped }
  }
  if (schema instanceof JsonIntersection || 'allOf' in schema) {
    const mapped: Array<JsonSchema> = []
    const { allOf, ...rest } = schema
    for (const item of allOf as ReadonlyArray<JsonSchema>) {
      mapped.push(method(item))
    }
    return { ...method(rest), allOf: mapped }
  }
  return schema
}

/** @internal */
export const as2007: (schema: JsonSchema) => JsonSchema = schema => {
  if ('$defs' in schema) {
    const { $defs, ...rest } = schema
    // istanbul ignore next
    return {
      ...as2007(rest),
      $defs: undefined,
      definitions: $defs === undefined ? undefined : RR.map(as2007)($defs),
    }
  }
  return remapRecurse(as2007, 'definitions')(schema)
}

/** @internal */
export const as2020: (schema: JsonSchema) => JsonSchema = schema => {
  if ('$defs' in schema) {
    const { $defs, ...rest } = schema
    // istanbul ignore next
    return {
      ...as2020(rest),
      $defs: $defs === undefined ? undefined : RR.map(as2020)($defs),
    }
  }
  if (schema instanceof JsonArray || 'items' in schema) {
    const items = schema.items as JsonSchema | ReadonlyArray<JsonSchema>
    if (Array.isArray(items)) {
      const mapped: Array<JsonSchema> = []
      for (const item of items as ReadonlyArray<JsonSchema>) {
        mapped.push(as2020(item))
      }
      return { ...schema, prefixItems: mapped, items: false }
    }
    return schema
  }
  return remapRecurse(as2020)(schema)
}
