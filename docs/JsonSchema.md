---
title: JsonSchema.ts
nav_order: 7
permalink: /json-schema/
---

## JsonSchema overview

Models for JsonSchema with derivations in Draft-07, 2019-09, and 2020-12

Added in v1.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combintators](#combintators)
  - [annotate](#annotate)
- [Constructors](#constructors)
  - [array](#array)
  - [booleanSchema](#booleanschema)
  - [emptySchema](#emptyschema)
  - [integer](#integer)
  - [intersection](#intersection)
  - [literal](#literal)
  - [nullSchema](#nullschema)
  - [number](#number)
  - [record](#record)
  - [ref](#ref)
  - [string](#string)
  - [struct](#struct)
  - [tuple](#tuple)
  - [union](#union)
- [Destructors](#destructors)
  - [stripIdentity](#stripidentity)
- [Interpreters](#interpreters)
  - [deriveJsonSchema](#derivejsonschema)
- [Model](#model)
  - [JsonSchema (type alias)](#jsonschema-type-alias)
  - [JsonSchemaValue (type alias)](#jsonschemavalue-type-alias)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Combintators

## annotate

**Signature**

```ts
export declare const annotate: (
  params?:
    | {
        readonly title?: string | undefined
        readonly description?: string | undefined
        readonly references?: Readonly<Record<string, JsonSchema>> | undefined
        readonly deprecated?: boolean | undefined
        readonly readOnly?: boolean | undefined
      }
    | undefined
) => (schema: JsonSchema) => Const<JsonSchema, never>
```

Added in v1.2.0

# Constructors

## array

**Signature**

```ts
export declare const array: (params?: {
  minItems?: number
  maxItems?: number
}) => <A>(items: Const<JsonSchema, A>) => Const<JsonSchema, A[]>
```

Added in v1.2.0

## booleanSchema

**Signature**

```ts
export declare const booleanSchema: Const<JsonSchema, boolean>
```

Added in v1.2.0

## emptySchema

**Signature**

```ts
export declare const emptySchema: Const<I.JsonEmpty, never>
```

Added in v1.2.0

## integer

**Signature**

```ts
export declare const integer: <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined
>(params?: {
  minimum?: Min | undefined
  maximum?: Max | undefined
}) => Const<
  JsonSchema,
  Opaque<
    number,
    IntBrand<Min extends undefined ? -9007199254740991 : Min, Max extends undefined ? 9007199254740991 : Max>
  >
>
```

Added in v1.2.0

## intersection

**Signature**

```ts
export declare const intersection: <B>(
  right: Const<JsonSchema, B>
) => <A>(left: Const<JsonSchema, A>) => Const<JsonSchema, A & B>
```

Added in v1.2.0

## literal

**Signature**

```ts
export declare const literal: <A extends string | number | boolean | null>(value: A) => Const<JsonSchema, A>
```

Added in v1.2.0

## nullSchema

**Signature**

```ts
export declare const nullSchema: Const<I.JsonNull, never>
```

Added in v1.2.0

## number

**Signature**

```ts
export declare const number: <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined
>(params?: {
  minimum?: Min | undefined
  maximum?: Max | undefined
}) => Const<
  JsonSchema,
  Opaque<
    number,
    FloatBrand<
      Min extends undefined ? -1.7976931348623157e308 : Min,
      Max extends undefined ? 1.7976931348623157e308 : Max
    >
  >
>
```

Added in v1.2.0

## record

**Signature**

```ts
export declare const record: <A>(
  additionalProperties: Const<JsonSchema, A>,
  propertyNames?:
    | (I.JsonEmpty & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonString & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonNumber & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonBoolean & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonNull & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonInteger & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonConst & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonString & I.JsonConst & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonNumber & I.JsonConst & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonBoolean & I.JsonConst & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonNull & I.JsonConst & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonStruct & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonArray & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonUnion & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonIntersection & I.Description & I.References & I.Default & { readonly _A: string })
    | (I.JsonRef & I.Description & I.References & I.Default & { readonly _A: string })
    | undefined
) => Const<JsonSchema, Record<string, A>>
```

Added in v1.2.0

## ref

A reference to a schema definition

**Signature**

```ts
export declare const ref: <A>(ref: string) => Const<JsonSchema, A>
```

Added in v2.0.0

## string

**Signature**

```ts
export declare const string: (params?: {
  minLength?: number
  maxLength?: number
  pattern?: string
  contentEncoding?: string
  contentMediaType?: string
  contentSchema?: JsonSchema
  format?: string
}) => Const<JsonSchema, string>
```

Added in v1.2.0

## struct

**Signature**

```ts
export declare const struct: <A>(
  properties: { [K in keyof A]: Const<JsonSchema, A[K]> },
  required?: ReadonlyArray<string>,
  additionalProperties?:
    | false
    | (I.JsonEmpty & I.Description & I.References & I.Default)
    | (I.JsonString & I.Description & I.References & I.Default)
    | (I.JsonNumber & I.Description & I.References & I.Default)
    | (I.JsonBoolean & I.Description & I.References & I.Default)
    | (I.JsonNull & I.Description & I.References & I.Default)
    | (I.JsonInteger & I.Description & I.References & I.Default)
    | (I.JsonConst & I.Description & I.References & I.Default)
    | (I.JsonString & I.JsonConst & I.Description & I.References & I.Default)
    | (I.JsonNumber & I.JsonConst & I.Description & I.References & I.Default)
    | (I.JsonBoolean & I.JsonConst & I.Description & I.References & I.Default)
    | (I.JsonNull & I.JsonConst & I.Description & I.References & I.Default)
    | (I.JsonStruct & I.Description & I.References & I.Default)
    | (I.JsonArray & I.Description & I.References & I.Default)
    | (I.JsonUnion & I.Description & I.References & I.Default)
    | (I.JsonIntersection & I.Description & I.References & I.Default)
    | (I.JsonRef & I.Description & I.References & I.Default)
    | undefined
) => Const<JsonSchema, A>
```

Added in v1.2.0

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...items: { [K in keyof A]: Const<JsonSchema, A[K]> }
) => Const<JsonSchema, A>
```

Added in v1.2.0

## union

**Signature**

```ts
export declare const union: <U extends readonly Const<JsonSchema, unknown>[]>(
  ...members: U
) => Const<JsonSchema, U[number] extends Const<JsonSchema, infer A> ? A : never>
```

Added in v1.2.0

# Destructors

## stripIdentity

Removes the internal class identities from a `JsonSchema`

**Signature**

```ts
export declare const stripIdentity: (schema: JsonSchema) => JsonSchema
```

Added in v1.2.0

# Interpreters

## deriveJsonSchema

Interprets a schema as a JsonSchema projecting into either Draft-07 or 2020-12

**Signature**

```ts
export declare const deriveJsonSchema: <I, O>(
  schema: Schema<I, O>,
  version?: 'Draft-07' | '2019-09' | '2020-12',
  maintainIdentity?: boolean
) => JsonSchema
```

Added in v1.2.0

# Model

## JsonSchema (type alias)

**Signature**

```ts
export type JsonSchema = JsonSchemaValue & I.Description & I.References & I.Default
```

Added in v1.2.0

## JsonSchemaValue (type alias)

**Signature**

```ts
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
```

Added in v1.2.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/JsonSchema'
```

Added in v1.2.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.2.0
