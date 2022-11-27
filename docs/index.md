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
- [v2 Roadmap](#v2-roadmap)
<!-- AUTO-GENERATED-CONTENT:END -->

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