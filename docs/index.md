---
title: Home
permalink: /
has_children: false
nav_order: 1
---

# schemata-ts

![Build Status](https://github.com/jacob-alford/schemata-ts/actions/workflows/build.yml/badge.svg)
[![NPM Version](https://badge.fury.io/js/schemata-ts.svg)](https://badge.fury.io/js/schemata-ts)
[![Coverage Status](https://coveralls.io/repos/github/jacob-alford/schemata-ts/badge.svg?branch=main)](https://coveralls.io/github/jacob-alford/schemata-ts?branch=main)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/schemata-ts)
![License](https://img.shields.io/github/license/jacob-alford/schemata-ts)

## Welcome

A schema is an expression of a type structure that can be used to generate typeclass instances from a single declaration. Typeclass instances can perform a variety of tasks, for instance `Decoder` can take a pesky `unknown` value and give you an Either in return where the success case abides by the `schema` that generated it. The example below constructs a `User` schema.

## Codec

A codec is a typeclass that contains the methods of `Decoder`, `Encoder`, `JsonSerializer`, `JsonDeserializer`, and `Guard`. Decoder and encoder are lossless when composed together. This means that for all domain types for which an encoder encodes to, a decoder will return a valid `E.Right` value.

Likewise, `JsonSerializer` and `JsonDeserializer` are lossless when composed together. Certain data types in Javascript like `NaN`, `undefined`, `Infinity`, and others are not part of the JSON specification, and `JSON.stringify` will turn these values into something different. This means that if you stringify these types and attempt to parse, you will get a different object than you originally started with. Additionally, JSON cannot stringify `bigint`, and cannot contain circular references. Under these circumstances `JSON.stringify` may throw an error.

`JsonSerializer` and `JsonDeserializer` are typeclasses included in a Codec which are lossless when composed together. So anything that successfully stringifies using `JsonSerializer` will successfully parse with `JsonDeserializer` and be equivalent objects. This is useful to avoid bugs when using JSON strings for storing data. Additionally, `JsonDeserializer` will decode the Json string into a domain type for immediate use in your program.

### User Document Example

This is a live example found in `src/Codec.ts` type-checked and tested with [docs-ts](https://github.com/gcanti/docs-ts).

```typescript
import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getCodec } from 'schemata-ts/Codec'
import * as S from 'schemata-ts/schemata'

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

export const userArbitrary = getArbitrary(User).arbitrary(fc)
export const userCodec = getCodec(User)

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

const invalidInput = {
  // not a UUID
  id: 123,
  // Not ISO 8601 compliant, though parsable with `new Date()`
  created_at: 'October 31, 2021',
  updated_at: 'November 22, 2022 12:30',
  // Empty string not allowed
  name: '',
  // Non-ASCII characters not allowed
  username: '😂😂😂',
  // Positive Ints only
  age: 0,
  // hex color values only
  favorite_color: 'rgb(105, 190, 239)',
}

// Using Decoders

assert.deepStrictEqual(userCodec.decode(validInput), E.right(expectedOutput))
assert.deepStrictEqual(userCodec.decode(invalidInput)._tag, 'Left')

// Using Arbitraries, Encoders, and Decoders

const testUsers = fc.sample(userArbitrary, 10)

assert.deepStrictEqual(
  pipe(
    testUsers,
    // Encode the users generated using Arbitrary
    RA.map(userCodec.encode),
    // Decode the encoded users back to their original form, collecting any errors
    E.traverseArray(userCodec.decode),
  ),
  E.right(testUsers),
)
```