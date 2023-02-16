---
title: struct.ts
nav_order: 69
parent: Modules
---

## struct overview

A meta definition for a struct for use with `StructM` schema

Added in v1.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [CamelCaseLambda (interface)](#camelcaselambda-interface)
  - [camelCaseKeys](#camelcasekeys)
  - [mapKeyTo](#mapkeyto)
  - [mapKeysWith](#mapkeyswith)
- [Constructors](#constructors)
  - [defineStruct](#definestruct)
  - [optional](#optional)
  - [required](#required)
  - [struct](#struct)
- [Guards](#guards)
  - [isOptionalFlag](#isoptionalflag)
  - [isRequiredFlag](#isrequiredflag)
  - [keyIsNotMapped](#keyisnotmapped)
- [Model](#model)
  - [KeyFlag (type alias)](#keyflag-type-alias)
  - [KeyNotMapped (type alias)](#keynotmapped-type-alias)
  - [OptionalKeyFlag (type alias)](#optionalkeyflag-type-alias)
  - [Prop (interface)](#prop-interface)
  - [Prop1 (interface)](#prop1-interface)
  - [Prop2 (interface)](#prop2-interface)
  - [RequiredKeyFlag (type alias)](#requiredkeyflag-type-alias)
- [Models](#models)
  - [ApplyKeyRemap (type alias)](#applykeyremap-type-alias)
  - [KeyRemapLambda (interface)](#keyremaplambda-interface)
- [Utilities](#utilities)
  - [complete](#complete)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)

---

# Combinators

## CamelCaseLambda (interface)

A KeyRemapLambda for remapping keys to camelCase

**Signature**

```ts
export interface CamelCaseLambda extends KeyRemapLambda {
  readonly output: CamelCase<this['input'], { preserveConsecutiveUppercase: true }>
}
```

Added in v1.4.0

## camelCaseKeys

Remap a struct's non-camel-cased-keys into camelCase

**Signature**

```ts
export declare const camelCaseKeys: <S, Props>(
  props: Props
) => {
  [K in keyof Props]: Props[K] extends Prop2<infer Flag, any, infer Val, infer Remap>
    ? Remap extends typeof KeyNotMapped
      ? Prop2<Flag, S, Val, CamelCase<string & K, { preserveConsecutiveUppercase: true }>>
      : Prop2<Flag, S, Val, CamelCase<string & Remap, { preserveConsecutiveUppercase: true }>>
    : never
}
```

**Example**

```ts
import * as S from 'schemata-ts/schemata'
import * as s from 'schemata-ts/struct'
import { getEncoder } from 'schemata-ts/Encoder'

const databasePerson = s.struct({
  first_name: S.String,
  last_name: S.String,
  age: S.Number,
  is_married: S.BooleanFromString,
})

const DatabasePerson = S.StructM(s.camelCaseKeys(databasePerson))

// DatabasePerson will have the type:
// SchemaExt<
//   { first_name: string, last_name: string, age: number, is_married: string },
//   { firstName: string, lastName: string, age: number, isMarried: boolean }
// >

const encoder = getEncoder(DatabasePerson)

assert.deepStrictEqual(
  encoder.encode({
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
    isMarried: false,
  }),
  {
    first_name: 'John',
    last_name: 'Doe',
    age: 42,
    is_married: 'false',
  }
)
```

Added in v1.4.0

## mapKeyTo

Used to remap a property's key to a new key in the output type

**Signature**

```ts
export declare const mapKeyTo: MapKeyTo
```

**Example**

```ts
import * as fc from 'fast-check'
import * as S from 'schemata-ts/schemata'
import * as s from 'schemata-ts/struct'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getGuard } from 'schemata-ts/Guard'

const databasePerson = s.defineStruct({
  first_name: s.mapKeyTo('firstName')(s.required(S.String)),
  last_name: s.mapKeyTo('lastName')(s.required(S.String)),
  age: s.required(S.Number),
  is_married: s.mapKeyTo('isMarried')(s.required(S.BooleanFromString)),
})

const DatabasePerson = S.StructM(databasePerson)

// DatabasePerson will have the type:
// SchemaExt<
//   { first_name: string, last_name: string, age: number, is_married: string },
//   { firstName: string, lastName: string, age: number, isMarried: boolean }
// >

const arbitrary = getArbitrary(DatabasePerson).arbitrary(fc)
const guard = getGuard(DatabasePerson)

fc.assert(fc.property(arbitrary, guard.is))
```

Added in v1.3.0

## mapKeysWith

Remap a struct's keys using provided RemapLambda, and string-mapping function

**Signature**

```ts
export declare const mapKeysWith: MapKeysWith
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { getDecoder } from 'schemata-ts/Decoder'
import * as S from 'schemata-ts/schemata'
import * as s from 'schemata-ts/struct'

interface CapitalizeLambda extends s.KeyRemapLambda {
  readonly output: Capitalize<this['input']>
}

const capitalize: (s: string) => string = (s) => `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`

const MappedStructDecoder = pipe(
  s.defineStruct({
    foo: s.required(S.String),
    bar: s.optional(S.Number),
    qux: s.optional(S.Boolean),
  }),
  s.mapKeysWith<CapitalizeLambda>(capitalize),
  S.StructM,
  getDecoder
)

assert.deepStrictEqual(MappedStructDecoder.decode({ foo: 'foo', bar: 1 }), E.right({ Foo: 'foo', Bar: 1 }))
```

Added in v1.4.0

# Constructors

## defineStruct

**Signature**

```ts
export declare const defineStruct: StructDefinition
```

**Example**

```ts
import * as fc from 'fast-check'
import * as S from 'schemata-ts/schemata'
import * as s from 'schemata-ts/struct'
import { getGuard } from 'schemata-ts/Guard'
import { getArbitrary } from 'schemata-ts/Arbitrary'

const someDomainType = s.defineStruct({
  a: s.required(S.String),
  b: s.required(S.BooleanFromNumber),
})

const SomeDomainTypeSchema = S.StructM(someDomainType)

// SomeDomainType will have the type:
// SchemaExt<{ a: string, b: number }, { a: string, b: boolean }>

const arbitrary = getArbitrary(SomeDomainTypeSchema).arbitrary(fc)
const guard = getGuard(SomeDomainTypeSchema)

fc.assert(fc.property(arbitrary, guard.is))
```

Added in v1.3.0

## optional

Indicates that a property is optional

**Signature**

```ts
export declare const optional: Optional
```

Added in v1.3.0

## required

Indicates that a property is required

**Signature**

```ts
export declare const required: Required
```

Added in v1.3.0

## struct

Defines a StructM declaration where all keys are required

**Signature**

```ts
export declare const struct: Struct
```

**Example**

```ts
import * as S from 'schemata-ts/schemata'
import * as s from 'schemata-ts/struct'
import { getEncoder } from 'schemata-ts/Encoder'

const someDomainType = s.struct({
  a: S.String,
  b: S.BooleanFromNumber,
})

const SomeDomainTypeSchema = S.StructM(someDomainType)

// SomeDomainTypeSchema will have the type:
// SchemaExt<{ a: string, b: number }, { a: string, b: boolean }>

const encoder = getEncoder(SomeDomainTypeSchema)

assert.deepStrictEqual(
  encoder.encode({
    a: 'foo',
    b: false,
  }),
  {
    a: 'foo',
    b: 0,
  }
)
```

Added in v1.4.0

# Guards

## isOptionalFlag

**Signature**

```ts
export declare const isOptionalFlag: (flag: KeyFlag) => flag is 'Optional'
```

Added in v1.3.0

## isRequiredFlag

**Signature**

```ts
export declare const isRequiredFlag: (flag: KeyFlag) => flag is 'Required'
```

Added in v1.3.0

## keyIsNotMapped

**Signature**

```ts
export declare const keyIsNotMapped: (key: string | KeyNotMapped) => key is typeof KeyNotMapped
```

Added in v1.3.0

# Model

## KeyFlag (type alias)

**Signature**

```ts
export type KeyFlag = OptionalKeyFlag | RequiredKeyFlag
```

Added in v1.3.0

## KeyNotMapped (type alias)

**Signature**

```ts
export type KeyNotMapped = typeof KeyNotMapped
```

Added in v1.3.0

## OptionalKeyFlag (type alias)

**Signature**

```ts
export type OptionalKeyFlag = 'Optional'
```

Added in v1.3.0

## Prop (interface)

Meta information for an HKT2 for if the key is optional or required, and if the key is remapped

**Signature**

```ts
export interface Prop<Flag extends KeyFlag, S, Val extends HKT2<S, any, any>, K extends string | KeyNotMapped> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}
```

Added in v1.3.0

## Prop1 (interface)

Meta information for a Kind for if the key is optional or required, and if the key is remapped

**Signature**

```ts
export interface Prop1<
  Flag extends KeyFlag,
  S extends URIS,
  Val extends Kind<S, any>,
  K extends string | KeyNotMapped
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}
```

Added in v1.3.0

## Prop2 (interface)

Meta information for a Kind2 for if the key is optional or required, and if the key is remapped

**Signature**

```ts
export interface Prop2<
  Flag extends KeyFlag,
  S extends URIS2,
  Val extends Kind2<S, any, any>,
  K extends string | KeyNotMapped
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}
```

Added in v1.3.0

## RequiredKeyFlag (type alias)

**Signature**

```ts
export type RequiredKeyFlag = 'Required'
```

Added in v1.3.0

# Models

## ApplyKeyRemap (type alias)

Applies a remap type-level function to a remap lambda

**Signature**

```ts
export type ApplyKeyRemap<R extends KeyRemapLambda, Val extends string> = R extends {
  readonly input: string
}
  ? (R & {
      readonly input: Val
    })['output']
  : {
      readonly R: R
      readonly input: (val: Val) => Val
    }
```

Added in v1.4.0

## KeyRemapLambda (interface)

A type-level key remap provider

**Signature**

```ts
export interface KeyRemapLambda {
  readonly input: string
  readonly output: string
}
```

Added in v1.4.0

# Utilities

## complete

Marks all properties as required.

**Signature**

```ts
export declare const complete: Complete
```

Added in v1.3.0

## omit

Exclude a set of keys from an object. Built for StructM but works with any struct

**Signature**

```ts
export declare const omit: <A extends Record<string, unknown>, Keys extends [keyof A, ...Exclude<keyof A, Keys[0]>[]]>(
  ...omittedKeys: Keys
) => (obj: A) => { [K in Exclude<keyof A, Keys[number]>]: A[K] }
```

Added in v1.3.0

## partial

Marks all properties as optional

**Signature**

```ts
export declare const partial: Partial
```

Added in v1.3.0

## pick

Include only a specified set of keys of an object. Built for StructM but works with any struct

**Signature**

```ts
export declare const pick: <A extends Record<string, unknown>, Keys extends [keyof A, ...Exclude<keyof A, Keys[0]>[]]>(
  ...keys: Keys
) => (obj: A) => { [K in Keys[number]]: A[K] }
```

Added in v1.3.0
