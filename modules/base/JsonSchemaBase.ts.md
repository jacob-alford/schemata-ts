---
title: base/JsonSchemaBase.ts
nav_order: 7
parent: Modules
---

## JsonSchemaBase overview

Models for JsonSchema as subsets of JSON Schema Draft 4, Draft 6, and Draft 7.

**Example**

```ts
import * as JS from 'schemata-ts/base/JsonSchemaBase'
import * as S from 'schemata-ts/schemata'
import { getJsonSchema } from 'schemata-ts/JsonSchema'

const schema = S.Struct({
  id: S.Natural,
  jwt: S.Jwt,
  tag: S.Literal('Customer'),
})

const jsonSchema = getJsonSchema(schema)

assert.deepStrictEqual(JS.stripIdentity(jsonSchema), {
  type: 'object',
  required: ['id', 'jwt', 'tag'],
  properties: {
    id: { type: 'integer', minimum: 0, maximum: 9007199254740991 },
    jwt: {
      type: 'string',
      description: 'Jwt',
      pattern: '^(([A-Za-z0-9_\\x2d]*)\\.([A-Za-z0-9_\\x2d]*)(\\.([A-Za-z0-9_\\x2d]*)){0,1})$',
    },
    tag: { type: 'string', const: 'Customer' },
  },
})
```

Added in v1.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combintators](#combintators)
  - [annotate](#annotate)
- [Constructors](#constructors)
  - [booleanSchema](#booleanschema)
  - [emptySchema](#emptyschema)
  - [makeArraySchema](#makearrayschema)
  - [makeExclusionSchema](#makeexclusionschema)
  - [makeIntegerSchema](#makeintegerschema)
  - [makeIntersectionSchema](#makeintersectionschema)
  - [makeLiteralSchema](#makeliteralschema)
  - [makeNumberSchema](#makenumberschema)
  - [makeRecordSchema](#makerecordschema)
  - [makeStringSchema](#makestringschema)
  - [makeStructSchema](#makestructschema)
  - [makeTupleSchema](#maketupleschema)
  - [makeUnionSchema](#makeunionschema)
  - [nullSchema](#nullschema)
- [Destructors](#destructors)
  - [stripIdentity](#stripidentity)
- [Guards](#guards)
  - [isJsonArray](#isjsonarray)
  - [isJsonBoolean](#isjsonboolean)
  - [isJsonConst](#isjsonconst)
  - [isJsonEmpty](#isjsonempty)
  - [isJsonExclude](#isjsonexclude)
  - [isJsonInteger](#isjsoninteger)
  - [isJsonIntersection](#isjsonintersection)
  - [isJsonLiteral](#isjsonliteral)
  - [isJsonNull](#isjsonnull)
  - [isJsonNumber](#isjsonnumber)
  - [isJsonPrimitive](#isjsonprimitive)
  - [isJsonRecord](#isjsonrecord)
  - [isJsonString](#isjsonstring)
  - [isJsonStruct](#isjsonstruct)
  - [isJsonUnion](#isjsonunion)
- [Instances](#instances)
  - [Schemable](#schemable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Model](#model)
  - [JsonSchema (type alias)](#jsonschema-type-alias)
  - [JsonSchemaWithDescription (type alias)](#jsonschemawithdescription-type-alias)

---

# Combintators

## annotate

**Signature**

```ts
export declare const annotate: (
  params?: { title?: string | undefined; description?: string | undefined } | undefined
) => (schema: JsonSchema) => Const<JsonSchemaWithDescription, never>
```

Added in v1.2.0

# Constructors

## booleanSchema

**Signature**

```ts
export declare const booleanSchema: Const<JsonSchema, boolean>
```

Added in v1.2.0

## emptySchema

**Signature**

```ts
export declare const emptySchema: Const<JsonEmpty, never>
```

Added in v1.2.0

## makeArraySchema

**Signature**

```ts
export declare const makeArraySchema: (params?: {
  minItems?: number
  maxItems?: number
}) => <A>(items: Const<JsonSchema, A>) => Const<JsonSchema, A[]>
```

Added in v1.2.0

## makeExclusionSchema

**Signature**

```ts
export declare const makeExclusionSchema: <A, Z extends A>(
  exclude: Z,
  schema: Const<JsonSchema, A>
) => Const<JsonSchema, Exclude<A, Z>>
```

Added in v1.2.0

## makeIntegerSchema

**Signature**

```ts
export declare const makeIntegerSchema: (params?: { minimum?: number; maximum?: number }) => Const<JsonSchema, Int>
```

Added in v1.2.0

## makeIntersectionSchema

**Signature**

```ts
export declare const makeIntersectionSchema: <B>(
  right: Const<JsonSchema, B>
) => <A>(left: Const<JsonSchema, A>) => Const<JsonSchema, A & B>
```

Added in v1.2.0

## makeLiteralSchema

**Signature**

```ts
export declare const makeLiteralSchema: <A extends Literal>(value: A) => Const<JsonSchema, A>
```

Added in v1.2.0

## makeNumberSchema

**Signature**

```ts
export declare const makeNumberSchema: (params?: { minimum?: number; maximum?: number }) => Const<JsonSchema, number>
```

Added in v1.2.0

## makeRecordSchema

**Signature**

```ts
export declare const makeRecordSchema: <A>(
  additionalProperties: Const<JsonSchema, A>
) => Const<JsonSchema, Record<string, A>>
```

Added in v1.2.0

## makeStringSchema

**Signature**

```ts
export declare const makeStringSchema: (params?: {
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

## makeStructSchema

**Signature**

```ts
export declare const makeStructSchema: <A>(
  properties: { [K in keyof A]: Const<JsonSchema, A[K]> },
  required?: ReadonlyArray<string>
) => Const<JsonSchema, A>
```

Added in v1.2.0

## makeTupleSchema

**Signature**

```ts
export declare const makeTupleSchema: <A extends readonly unknown[]>(
  ...items: { [K in keyof A]: Const<JsonSchema, A[K]> }
) => Const<JsonSchema, A>
```

Added in v1.2.0

## makeUnionSchema

**Signature**

```ts
export declare const makeUnionSchema: <U extends readonly Const<JsonSchema, unknown>[]>(
  ...members: U
) => Const<JsonSchema, U[number] extends Const<JsonSchema, infer A> ? A : never>
```

Added in v1.2.0

## nullSchema

**Signature**

```ts
export declare const nullSchema: Const<JsonNull, never>
```

Added in v1.2.0

# Destructors

## stripIdentity

Removes the internal class identities from a `JsonSchema`

**Signature**

```ts
export declare const stripIdentity: <A>(schema: Const<JsonSchema, A>) => JsonSchema
```

Added in v1.2.0

# Guards

## isJsonArray

**Signature**

```ts
export declare const isJsonArray: (u: JsonSchema) => u is JsonArray
```

Added in v1.2.0

## isJsonBoolean

**Signature**

```ts
export declare const isJsonBoolean: (u: JsonSchema) => u is JsonBoolean
```

Added in v1.2.0

## isJsonConst

**Signature**

```ts
export declare const isJsonConst: (u: JsonSchema) => u is JsonConst
```

Added in v1.2.0

## isJsonEmpty

**Signature**

```ts
export declare const isJsonEmpty: (u: JsonSchema) => u is JsonEmpty
```

Added in v1.2.0

## isJsonExclude

**Signature**

```ts
export declare const isJsonExclude: (u: JsonSchema) => u is JsonExclude
```

Added in v1.2.0

## isJsonInteger

**Signature**

```ts
export declare const isJsonInteger: (u: JsonSchema) => u is JsonInteger
```

Added in v1.2.0

## isJsonIntersection

**Signature**

```ts
export declare const isJsonIntersection: (u: JsonSchema) => u is JsonIntersection
```

Added in v1.2.0

## isJsonLiteral

**Signature**

```ts
export declare const isJsonLiteral: (u: JsonSchema) => u is JsonLiteral
```

Added in v1.2.0

## isJsonNull

**Signature**

```ts
export declare const isJsonNull: (u: JsonSchema) => u is JsonNull
```

Added in v1.2.0

## isJsonNumber

**Signature**

```ts
export declare const isJsonNumber: (u: JsonSchema) => u is JsonNumber
```

Added in v1.2.0

## isJsonPrimitive

**Signature**

```ts
export declare const isJsonPrimitive: (
  u: JsonSchema
) => u is
  | JsonNull
  | (JsonString & JsonConst)
  | (JsonNumber & JsonConst)
  | (JsonBoolean & JsonConst)
  | (JsonNull & JsonConst)
```

Added in v1.2.0

## isJsonRecord

**Signature**

```ts
export declare const isJsonRecord: (u: JsonSchema) => u is JsonRecord
```

Added in v1.2.0

## isJsonString

**Signature**

```ts
export declare const isJsonString: (u: JsonSchema) => u is JsonString
```

Added in v1.2.0

## isJsonStruct

**Signature**

```ts
export declare const isJsonStruct: (u: JsonSchema) => u is JsonStruct
```

Added in v1.2.0

## isJsonUnion

**Signature**

```ts
export declare const isJsonUnion: (u: JsonSchema) => u is JsonUnion
```

Added in v1.2.0

# Instances

## Schemable

**Signature**

```ts
export declare const Schemable: Schemable2<'JsonSchema'>
```

Added in v1.2.0

## URI

**Signature**

```ts
export declare const URI: 'JsonSchema'
```

Added in v1.2.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.2.0

# Model

## JsonSchema (type alias)

**Signature**

```ts
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
```

Added in v1.2.0

## JsonSchemaWithDescription (type alias)

**Signature**

```ts
export type JsonSchemaWithDescription = JsonSchema & Description
```

Added in v1.2.0
