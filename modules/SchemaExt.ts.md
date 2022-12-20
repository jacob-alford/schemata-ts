---
title: SchemaExt.ts
nav_order: 25
parent: Modules
---

## SchemaExt overview

Schema combinators for SchemableExt

**Example**

```ts
// e.g. src/domain/User.ts
import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts/schemata'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getCodec } from 'schemata-ts/Codec'
import { getEq } from 'schemata-ts/Eq'

export const User = S.Struct({
  id: S.UUID(5),
  created_at: S.DateFromIsoString({ requireTime: 'None' }),
  updated_at: S.DateFromIsoString({ requireTime: 'TimeAndOffset' }),
  email: S.EmailAddress,
  name: S.NonEmptyString,
  username: S.Ascii,
  age: S.PositiveInt,
  favorite_color: S.OptionFromNullable(S.HexColor),
})

export type User = S.TypeOf<typeof User>
export type UserInput = S.InputOf<typeof User>

export const arbitrary = getArbitrary(User).arbitrary(fc)
export const codec = getCodec(User)
export const eq = getEq(User)

// ...elsewhere

const validInput = {
  id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
  created_at: '+002021-10-31',
  updated_at: '2022-11-22T18:30Z',
  name: 'Johnathan Doe',
  email: 'jdoe22@probably-doesnt-exist.com',
  username: 'jdoe22',
  age: 52,
  favorite_color: null,
}

const expectedOutput = {
  id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
  created_at: new Date('+002021-10-31'),
  updated_at: new Date('2022-11-22T18:30Z'),
  name: 'Johnathan Doe',
  email: 'jdoe22@probably-doesnt-exist.com',
  username: 'jdoe22',
  age: 52,
  favorite_color: O.none,
}

assert.deepStrictEqual(codec.decode(validInput), E.right(expectedOutput))

const invalidInput = codec.decode({
  // not a UUID
  id: 123,
  // Not ISO 8601 compliant, though parsable with `new Date()`
  created_at: 'October 31, 2021',
  updated_at: 'November 22, 2022 12:30',
  // Empty string not allowed
  name: '',
  // Non-ASCII characters not allowed
  username: '😂😂😂',
  // Non-negative Ints only
  age: 0,
  // hex color values only
  favorite_color: 'rgb(105, 190, 239)',
})

assert.equal(invalidInput._tag, 'Left')
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [make](#make)
- [Destructors](#destructors)
  - [interpret](#interpret)
- [Model](#model)
  - [Interpreter (type alias)](#interpreter-type-alias)
  - [SchemaExt (interface)](#schemaext-interface)
- [Utilities](#utilities)
  - [InputOf (type alias)](#inputof-type-alias)
  - [OutputOf (type alias)](#outputof-type-alias)
  - [TypeOf (type alias)](#typeof-type-alias)

---

# Constructors

## make

**Signature**

```ts
export declare function make<E, A>(f: SchemaExt<E, A>): SchemaExt<E, A>
```

Added in v1.0.0

# Destructors

## interpret

Derives a typeclass instance from a Schema by supplying Schemable. i.e. `schemata-ts/Decoder`

**Signature**

```ts
export declare const interpret: Interpreter
```

Added in v1.0.0

# Model

## Interpreter (type alias)

**Signature**

```ts
export type Interpreter = {
  <S extends URIS2>(S: SchemableExt2<S>): <E, A>(schema: SchemaExt<E, A>) => Kind2<S, E, A>
  <S extends URIS2>(S: SchemableExt2C<S>): <A>(schema: SchemaExt<unknown, A>) => Kind2<S, unknown, A>
  <S extends URIS>(S: SchemableExt1<S>): <A>(schema: SchemaExt<unknown, A>) => Kind<S, A>
}
```

Added in v1.0.0

## SchemaExt (interface)

**Signature**

```ts
export interface SchemaExt<E, A> {
  <S>(S: SchemableExt<S>): HKT2<S, E, A>
}
```

Added in v1.0.0

# Utilities

## InputOf (type alias)

Extract the input type of a schema.

**Signature**

```ts
export type InputOf<S> = S extends SchemaExt<infer I, unknown> ? I : never
```

Added in v1.0.0

## OutputOf (type alias)

Extract the output of a schema.

Alias of `TypeOf`

**Signature**

```ts
export type OutputOf<S> = TypeOf<S>
```

Added in v1.0.0

## TypeOf (type alias)

Extract the output of a schema

**Signature**

```ts
export type TypeOf<S> = S extends SchemaExt<unknown, infer A> ? A : never
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts/schemata'
import { getEncoder } from 'schemata-ts/Encoder'

const optionFromNullable = S.OptionFromNullable(S.String)

// type Input = S.InputOf<typeof optionFromNullable>
// type Input = string | null

// type Output = S.OutputOf<typeof optionFromNullable>
// Option<string>

const encoder = getEncoder(optionFromNullable)

assert.deepStrictEqual(encoder.encode(O.some('a')), 'a')
assert.deepStrictEqual(encoder.encode(O.none), null)
```

Added in v1.0.0
