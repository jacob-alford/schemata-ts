---
title: DecodeError.ts
nav_order: 13
parent: Modules
---

## DecodeError overview

A collection of utility functions for mapping `DecodeError`s from io-ts/DecodeError.

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as Str from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { getDecoder } from 'schemata-ts/Decoder'
import { foldMap } from 'schemata-ts/DecodeError'
import * as S from 'schemata-ts/schemata'

const User = S.Struct({
  name: S.NonEmptyString,
  favoriteIntegers: S.Array(S.Int()),
})

const decoder = getDecoder(User)

type DomainError = string

const mapError = foldMap(Str.Semigroup)<DomainError>({
  Leaf: (got, err) => `Expected ${err}, but Received ${got === '' ? '""' : got}; `,
  Key: (key, kind, errors) => `At property key ${key} (${kind}): ${errors}`,
  Index: (index, kind, errors) => `At index ${index} (${kind}): ${errors}`,
  Member: (index, errors) => `At Union Member ${index}: ${errors}`,
  Lazy: (_, errors) => errors,
  Wrap: (error, errors) => `${error}; ${errors}`,
})

const input = {
  name: '',
  favoriteIntegers: [1, NaN, 3, 4.1, 5],
}

const result = pipe(decoder.decode(input), E.mapLeft(mapError))

assert.deepStrictEqual(
  result,
  E.left(
    'At property key name (required): Expected NonEmptyString, but Received ""; At property key favoriteIntegers (required): At index 1 (optional): Expected number, but Received NaN; At index 3 (optional): Expected int, but Received 4.1; '
  )
)
```

Added in v1.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [drawTree](#drawtree)
  - [foldMap](#foldmap)
  - [foldMapFlat](#foldmapflat)

---

# Destructors

## drawTree

Draws a `DecodeError` as a tree structure using indentation markings and newlines.

**Signature**

```ts
export declare const drawTree: (e: FSg.FreeSemigroup<DE.DecodeError<string>>) => string
```

Added in v1.0.1

## foldMap

Converts a DecodeError to a type of a given Semigroup using a supplied instance and
mapping function.

**Signature**

```ts
export declare const foldMap: <S>(
  S: Sg.Semigroup<S>
) => <E>(matchers: {
  readonly Leaf: (input: unknown, e: E) => S
  readonly Key: (key: string, kind: DE.Kind, errors: S) => S
  readonly Index: (index: number, kind: DE.Kind, errors: S) => S
  readonly Member: (index: number, errors: S) => S
  readonly Lazy: (id: string, errors: S) => S
  readonly Wrap: (error: E, errors: S) => S
}) => (errors: FSg.FreeSemigroup<DE.DecodeError<E>>) => S
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as Str from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { getDecoder } from 'schemata-ts/Decoder'
import { foldMap } from 'schemata-ts/DecodeError'
import * as S from 'schemata-ts/schemata'

const User = S.Struct({
  name: S.NonEmptyString,
  favoriteIntegers: S.Array(S.Int()),
})

const decoder = getDecoder(User)

type DomainError = string

const mapError = foldMap(Str.Semigroup)<DomainError>({
  Leaf: (got, err) => `Expected ${err}, but Received ${got === '' ? '""' : got}; `,
  Key: (key, kind, errors) => `At property key ${key} (${kind}): ${errors}`,
  Index: (index, kind, errors) => `At index ${index} (${kind}): ${errors}`,
  Member: (index, errors) => `At Union Member ${index}: ${errors}`,
  Lazy: (_, errors) => errors,
  Wrap: (error, errors) => `${error}; ${errors}`,
})

const input = {
  name: '',
  favoriteIntegers: [1, NaN, 3, 4.1, 5],
}

const result = pipe(decoder.decode(input), E.mapLeft(mapError))

assert.deepStrictEqual(
  result,
  E.left(
    'At property key name (required): Expected NonEmptyString, but Received ""; At property key favoriteIntegers (required): At index 1 (optional): Expected number, but Received NaN; At index 3 (optional): Expected int, but Received 4.1; '
  )
)
```

Added in v1.0.1

## foldMapFlat

Disregards a DecodeError's structure, mapping and combining into/using a supplied Semigroup.

**Signature**

```ts
export declare const foldMapFlat: <S>(
  S: Sg.Semigroup<S>
) => <E>(fold: (e: E) => S) => (errors: FSg.FreeSemigroup<DE.DecodeError<E>>) => S
```

Added in v1.0.1
