<div align="center">
  <img src="./assets/the-school-of-athens-crop-2.jpg" style="margin-top: 48px; width: 100%; max-width: 846px; border: 5px solid rgba(205,127,50,0.5); filter: drop-shadow(0 0 0.5rem rgba(0,0,0,0.5));"/>
</div>

<h1 align="center" style="margin: 12px 0px 12px 0px; padding-bottom: 12px;">
schemata-ts
</h1>

<p align="center" style="margin-bottom: 12px;">
Write domain types once.  A collection of Schemata inspired by io-ts-types and validators.js.
</p>

<div align="center">

![Build Status](https://github.com/jacob-alford/schemata-ts/actions/workflows/build.yml/badge.svg)
[![NPM Version](https://badge.fury.io/js/schemata-ts.svg)](https://badge.fury.io/js/schemata-ts)
[![Coverage Status](https://coveralls.io/repos/github/jacob-alford/schemata-ts/badge.svg?branch=main)](https://coveralls.io/github/jacob-alford/schemata-ts?branch=main)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/schemata-ts)
![License](https://img.shields.io/github/license/jacob-alford/schemata-ts)

</div>

## Table of Contents

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [Introduction](#introduction)
  - [User Document Example](#user-document-example)
  - [Using Generated Instances](#using-generated-instances)
- [Installation](#installation)
  - [Yarn](#yarn)
  - [NPM](#npm)
- [Documentation](#documentation)
- [Exported Schemata](#exported-schemata)
<!-- AUTO-GENERATED-CONTENT:END -->

## Introduction

A schema is an expression of a type structure that can be used to generate typeclass instances from a single declaration. The following example constructs a `User` schema from which the underlying domain type can be extracted, and a handful of useful instances generated.

### User Document Example

```typescript
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
  id: S.UUID({ version: 5 }),
  created_at: S.DateFromIsoString({ requireTime: 'None' }),
  updated_at: S.DateFromIsoString({ requireTime: 'TimeAndOffset' }),
  email: S.Email,
  name: S.NonEmptyString,
  username: S.ASCII,
  age: S.NonNegativeInt,
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

Generating a decoder instance can enforce a particular structure on an unknown data-type with run-time safety. This allows safe property and method access with knowledge that runtime types align with Typescript's type system.

```typescript
import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as User from 'src/domain/User'

const input: User.User = {
  id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
  created_at: '+002021-10-31',
  updated_at: '2022-11-22T18:30Z',
  name: 'Johnathan Doe',
  username: 'jdoe22',
  age: 52,
  favorite_color: null,
}

const expected = {
  id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
  created_at: new Date(2021, 9, 31),
  updated_at: new Date('2022-11-22T18:30Z'),
  name: 'Johnathan Doe',
  username: 'jdoe22',
  age: 52,
  favorite_color: O.none,
}

// Arbitraries
it('generates valid User Documents', () => {
  fc.assert(fc.property(User.arbitrary, User.guard.is))
})

// Decoding
assert.deepStrictEqual(User.decoder.decode(input), E.right(expected))

// Encoding
assert.deepStrictEqual(User.encoder.encode(expected), input)
```

## Installation

Uses `fp-ts`, and `io-ts` as peer dependencies. Read more about peer dependencies at [nodejs.org](https://nodejs.org/en/blog/npm/peer-dependencies/).

Also contains `fast-check` as a soft peer dependency. Constructing an arbitrary requires fast-check to exist in node_modules, this allows a reduction in bundle size for consumers where bundle size matters.

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
| Hexadecimal           | String         |
| HexColor              | String         |
| HslColor              | String         |
| Jwt                   | String         |
| LatLong               | String         |
| NonEmptyString        | String         |
| RGB                   | String         |
| UUID                  | String         |

> Additionally, there are more unlisted base schemable schemata also exported from `schemata-ts/schemata`. These can be used to construct more complex schemata. There are many examples in this repository to model your schema.
