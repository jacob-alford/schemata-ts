---
title: schemata/generic/CamelCaseFromMixed.ts
nav_order: 36
parent: Modules
---

## CamelCaseFromMixed overview

The same as the `Struct` schema combinator, but keys are transformed to camel case in
the output type.

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [CamelCaseFromMixedS (type alias)](#camelcasefrommixeds-type-alias)
- [Schema](#schema)
  - [CamelCaseFromMixed](#camelcasefrommixed)

---

# Model

## CamelCaseFromMixedS (type alias)

**Signature**

```ts
export type CamelCaseFromMixedS = <T extends Record<string, SchemaExt<unknown, unknown>>>(
  props: T
) => SchemaExt<
  {
    [K in keyof T]: InputOf<T[K]>
  },
  {
    [K in keyof T as CamelCase<K, { preserveConsecutiveUppercase: true }>]: OutputOf<T[K]>
  }
>
```

Added in v1.4.0

# Schema

## CamelCaseFromMixed

The same as the `Struct` schema combinator, but keys are transformed to camel case in
the output type.

**Signature**

```ts
export declare const CamelCaseFromMixed: CamelCaseFromMixedS
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as S from 'schemata-ts/schemata'
import { getDecoder } from 'schemata-ts/Decoder'

const DatabasePerson = S.CamelCaseFromMixed({
  first_name: S.String,
  last_name: S.String,
  age: S.Number,
  is_married: S.BooleanFromString,
})

// DatabasePerson will have the type:
// SchemaExt<
//   { first_name: string, last_name: string, age: number, is_married: string },
//   { firstName: string, lastName: string, age: number, isMarried: boolean }
// >

const decoder = getDecoder(DatabasePerson)

assert.deepStrictEqual(
  decoder.decode({
    first_name: 'John',
    last_name: 'Doe',
    age: 42,
    is_married: 'false',
  }),
  E.right({
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
    isMarried: false,
  })
)
```

Added in v1.4.0
