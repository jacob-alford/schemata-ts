---
title: Home
permalink: /
has_children: false
nav_order: 1
---

# `schemata-ts`

A collection of Schemas inspired by io-ts-types and validators.js.

![Build Status](https://github.com/jacob-alford/schemata-ts/actions/workflows/build.yml/badge.svg)
[![NPM Version](https://badge.fury.io/js/schemata-ts.svg)](https://badge.fury.io/js/schemata-ts)
[![Coverage Status](https://coveralls.io/repos/github/jacob-alford/schemata-ts/badge.svg?branch=main)](https://coveralls.io/github/jacob-alford/schemata-ts?branch=main)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/schemata-ts)
![License](https://img.shields.io/github/license/jacob-alford/schemata-ts)

## Table of Contents

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [Disclaimer](#disclaimer)
- [Contributing](#contributing)
  - [Test Coverage](#test-coverage)
  - [Module Structure](#module-structure)
- [Installation](#installation)
  - [Yarn](#yarn)
  - [NPM](#npm)
- [Documentation](#documentation)
- [Schemable types explained](#schemable-types-explained)
  - [The problem:](#the-problem)
  - [The solution: Schema / Schemable](#the-solution-schema--schemable)
  - [The value of schema](#the-value-of-schema)
- [Currently supported modules:](#currently-supported-modules)
<!-- AUTO-GENERATED-CONTENT:END -->

## Disclaimer

Version 0.1.0 is a transitionary release that will contain breaking changes upon release of the full version 1.0.0. 0.1.0 released on NPM is intended to be used with `SchemaExt.make(S => S.Nullable(S.String))`, where version 1.0.0 is almost exclusively `Schema` based, and will look something like this:

```typescript
import * as S from 'schemata-ts/schemas'
import * as I from 'schemata-ts/interpreters'

const User = S.Struct({
  id: S.UUID({ version: 5 }),
  email: S.Email,
  name: S.NonEmptyString,
  username: S.ASCII,
  age: S.NonNegativeInt,
  favoriteColor: S.OptionFromNullable(S.HexColor),
})

const arbitraryUser = I.getArbitrary(User)
const decoderUser = I.getDecoder(User)
const eqUser = I.getEq(User)
const guardUser = I.getGuard(User)
const taskDecoderUser = I.getTaskDecoder(User)
```

## Contributing

### Test Coverage

This library currently has 100% jest coverage, contributions are highly encouraged and we should seek to maintain this high level of test coverage. Send over a PR!

### Module Structure

The core API of `schemata-ts` is using the exports of `src/schemas.ts`. It is planned for these to be generated based on the files in `src / schemas / (string | number) / [ModuleName].ts`. Adding a new module is a two step process:

1. Build the Schema in the relevant directory
2. Generate the schemas file using the script (WIP)

## Installation

Uses `fp-ts`, and `io-ts` as peer dependencies. Read more about peer dependencies at [nodejs.org](https://nodejs.org/en/blog/npm/peer-dependencies/).

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

## Schemable types explained

### The problem:

At present there is no way\* in vanilla Typescript to derive domain typeclasses from domain types. Languages like Haskell, Purescript, and Rust support this functionality out of the box. With the older `io-ts` system you would have a domain declaration that looks like the following.

\*(Note: [ts-plus](https://dev.to/matechs/the-case-for-ts-18b3) seeks to extend Typescript with this functionality and more)

```typescript
import * as t from 'io-ts'

export const User = t.type({
  name: t.string,
  email: t.string,
  age: t.number,
})

export type User = t.TypeOf<typeof User>
```

Elsewhere in your package you could consume the `User` type using `User.decode(/* Some unknown data structure */)`, which would guarantee that the runtime type (if value was a `Right` value) conforms to the expected data structure.

The more recent development in `io-ts` splits `t` – a collection of combinators which construct a class of Decoders/Encoders – into distinct modules, `Decoder`, `Encoder`, `Eq`, etc. Using this newer system presents a challenge, as you can no longer get `Decoder`, `Encoder` in a unified class with a single definition.

```typescript
import * as D from 'io-ts/Decoder'
import * as Eq from 'io-ts/Eq'
import * as G from 'io-ts/Guard'

export type User = {
  name: string
  email: string
  age: number
  id: string
}

export const decodeUser: D.Decoder<User> = D.struct({
  name: D.string,
  email: D.string,
  age: D.number,
  id: D.string,
})

export const eqUser: Eq.Eq<User> = Eq.struct({
  name: Eq.string,
  email: Eq.string,
  age: Eq.number,
  id: Eq.string,
})

export const guardUser: G.Guard<User> = G.struct({
  name: G.string,
  email: G.string,
  age: G.number,
  id: G.string,
})
```

This works well and is type safe. But it comes with a big downside: if we need to change something, it is necessary to change it in four different places.

### The solution: Schema / Schemable

With Schemable, you first provide instructions (`Schema`) to construct a domain type, and then provide a way to interpret instructions (`Schemable`).

The example above can be refined to the following with Schema and Schemable:

```typescript
import { interpreter, make, TypeOf } from 'io-ts/Schema'
import * as D from 'io-ts/Decoder'
import * as Eq from 'io-ts/Eq'
import * as G from 'io-ts/Guard'

const UserSchema = make(S =>
  S.struct({
    name: S.string,
    email: S.string,
    age: S.number,
    id: S.string,
  })
)

export type User = TypeOf<UserSchema>

export const decodeUser = interpreter(D.Schemable)(UserSchema)

export const eqUser = interpreter(Eq.Schemable)(UserSchema)

export const guardUser = interpreter(G.Schemable)(UserSchema)
```

And with this, the structure of domain types and operators come from a single source, making future maintenance and extension trivial.

### The value of schema

`schemata-ts` comes with many different exported schemas that aims to provide similar levels of functionality to `io-ts-types` and `validators.js`.

Let's refine our User type.

```typescript
import * as S from 'schemata-ts/schemas'
import * as I from 'schemata-ts/interpreters'

const User = S.Struct({
  id: S.UUID({ version: 5 }),
  email: S.Email,
  name: S.NonEmptyString,
  username: S.ASCII,
  age: S.NonNegativeInt,
  favoriteColor: S.OptionFromNullable(S.HexColor),
})

const arbitraryUser = I.getArbitrary(User)
const decoderUser = I.getDecoder(User)
const eqUser = I.getEq(User)
const guardUser = I.getGuard(User)
const taskDecoderUser = I.getTaskDecoder(User)
```

And now we can guarantee that a user's email will conform to RFC 5322, their id will be a proper UUID-v5, and their age will not be negative.

## Currently supported modules:

| primitive | refinement                |
| --------- | ------------------------- |
| `Date`    | SafeDate.ts               |
| `generic` | optionFromExclude.ts      |
| `generic` | optionFromNullable.ts     |
| `generic` | optionFromUndefined.ts    |
| `generic` | mapFromEntries.ts         |
| `number`  | Int.ts                    |
| `number`  | Natural.ts                |
| `number`  | NegativeFloat.ts          |
| `number`  | NegativeInt.ts            |
| `number`  | NonNegativeFloat.ts       |
| `number`  | NonPositiveFloat.ts       |
| `number`  | NonPositiveInt.ts         |
| `number`  | PositiveFloat.ts          |
| `number`  | PositiveInt.ts            |
| `string`  | ASCII.ts                  |
| `string`  | Base64.ts                 |
| `string`  | Base64Url.ts              |
| `string`  | BigIntString.ts           |
| `string`  | BtcAddress.ts             |
| `string`  | CreditCard.ts             |
| `string`  | EmailAddress.ts           |
| `string`  | Hexadecimal.ts            |
| `string`  | HexColor.ts               |
| `string`  | HslColor.ts               |
| `string`  | IntString.ts              |
| `string`  | ISODateString.ts          |
| `string`  | JWT.ts                    |
| `string`  | NaturalString.ts          |
| `string`  | NegativeFloatString.ts    |
| `string`  | NegativeIntString.ts      |
| `string`  | NonemptyString.ts         |
| `string`  | NonNegativeFloatString.ts |
| `string`  | NonPositiveFloatString.ts |
| `string`  | NonPositiveIntString.ts   |
| `string`  | PositiveFloatString.ts    |
| `string`  | PositiveIntString.ts      |
| `string`  | RGB.ts                    |
| `string`  | UUID.ts                   |
