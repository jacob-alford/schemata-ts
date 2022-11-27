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

## Introduction

A schema is an expression of a type structure that can be used to generate typeclass instances from a single declaration. The following example constructs a `User` schema from which the underlying domain type can be extracted. `schemata-ts` generates the following typeclasses: `Arbitrary`, `Decoder`, `Encoder`, `Guard`, `Eq`, `TaskDecoder`, and `Type`.

### User Document Example

```typescript
// e.g. src/domain/User.ts
import * as fc from 'fast-check'
import * as S from 'schemata-ts/schemata'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getDecoder } from 'schemata-ts/Decoder'
import { getEncoder } from 'schemata-ts/Encoder'
import { getEq } from 'schemata-ts/Eq'
import { getGuard } from 'schemata-ts/Guard'
import { getTaskDecoder } from 'schemata-ts/TaskDecoder'

/** FooBar ltd. User document Schema */
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
export const decoder = getDecoder(User)
export const encoder = getEncoder(User)
export const eq = getEq(User)
export const guard = getGuard(User)
export const taskDecoder = getTaskDecoder(User)
```

### Using Generated Instances

Generating `Decoder`s guarantee that an unknown type conforms to a particular structure during run-time. This allows safe property and method access with knowledge that runtime types align with Typescript's type system. `Encoder`s go in the opposite direction, converting from domain-types back to raw types from which they were decoded. `fast-check` `Arbitrary` instances are a system for generating random examples, and are primarily used for highly rigorous testing. Schemata-ts can generate these typeclasses in addition to others like `Eq`, `Guard`, `TaskDecoder`, and `Type`.

```typescript
import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as User from 'src/domain/User'

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

// Arbitraries
it('generates valid User Documents', () => {
  fc.assert(fc.property(User.arbitrary, User.guard.is))
})

// Decoding
assert.deepStrictEqual(User.decoder.decode(validInput), E.right(expectedOutput))
assert.equal(User.decoder.decode(invalidInput)._tag, 'Left')

// Encoding
assert.deepStrictEqual(User.encoder.encode(expectedOutput), validInput)
```

## Installation

Uses `fp-ts`, and `io-ts` as peer dependencies. Read more about peer dependencies at [nodejs.org](https://nodejs.org/en/blog/npm/peer-dependencies/).

Also contains `fast-check` as a soft peer dependency. Soft peer dependency implies that usage of the `Arbitrary` module requires fast-check as a peer-dependency.

### Yarn

```bash
yarn add schemata-ts
```

### NPM

```bash
npm install schemata-ts
```

## Documentation

- [schemata-ts](https://jacob-alford.github.io/schemata-ts/modules/)
- [fp-ts](https://gcanti.github.io/fp-ts/modules/)
- [io-ts](https://gcanti.github.io/io-ts)
- [docs-ts](https://github.com/gcanti/docs-ts)

## Exported Schemata

| Schema                | Type           |
| --------------------- | -------------- |
| BooleanFromString     | Conversion     |
| BooleanFromNumber     | Conversion     |
| `Date.date`           | Base Schemable |
| `Date.dateFromString` | Base Schemable |
| DateFromInt           | Conversion     |
| DateFromIsoString     | Conversion     |
| DateFromUnixTime      | Conversion     |
| OptionFromNullable    | Conversion     |
| OptionFromUndefined   | Conversion     |
| BigIntFromString      | Conversion     |
| FloatFromString       | Conversion     |
| IntFromString         | Conversion     |
| `Int.int`             | Base Schemable |
| `Float.float`         | Base Schemable |
| Natural               | Number         |
| NegativeFloat         | Number         |
| NegativeInt           | Number         |
| NonNegativeFloat      | Number         |
| NonPositiveFloat      | Number         |
| NonPositiveInt        | Number         |
| PositiveFloat         | Number         |
| PositiveInt           | Number         |
| Ascii                 | String         |
| Base64                | String         |
| Base64Url             | String         |
| BitcoinAddress        | String         |
| CreditCard            | String         |
| EmailAddress          | String         |
| Ethereum Address      | String         |
| Hexadecimal           | String         |
| HexColor              | String         |
| HslColor              | String         |
| Jwt                   | String         |
| LatLong               | String         |
| NonEmptyString        | String         |
| RGB                   | String         |
| UUID                  | String         |

Additionally, there are more unlisted base schemable schemata also exported from `schemata-ts/schemata`. These can be used to construct more complex schemata. There are many examples of custom schemata in `src/schemata` to use as a reference.

## v2 Roadmap

`Schemata-ts`'s implementation of Schema is built on io-ts `Schemable`. This library wraps schemable with a schema-based API. The future of io-ts is likewise a schema system: [@fp-ts/schema](https://github.com/fp-ts/schema). Version 2.0 of `schemata-ts` will use @fp-ts/schema as its internals, and the external API will remain mostly the same.

Furthermore, schemata-ts is planned to support the following features in various 1.x, and 2.x versions in the near future:

- Json Schema: generating JSON-Schema from schemata ([#137](https://github.com/jacob-alford/schemata-ts/issues/137))
- Optic Schema: generating optics from schemata ([#134](https://github.com/jacob-alford/schemata-ts/issues/134))
- Mapped Structs: conversions between struct types, i.e. `snake-case` keys to `camelCase` keys
- More generic schemata: (SetFromArray, NonEmptyArray)
- More validator.js branded schemata
