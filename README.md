# `schemable-ts-types`

Exposes an extended Schemable typeclass `SchemableExt` with types inspired by `io-ts-types`, and `validators.js`.

![build status](https://github.com/jacob-alford/schemable-ts-types/actions/workflows/build.yml/badge.svg)
[![npm version](https://badge.fury.io/js/schemable-ts-types.svg)](https://badge.fury.io/js/schemable-ts-types)
[![hit count](https://hits.dwyl.com/jacob-alford/schemable-ts-types.svg?style=flat)](http://hits.dwyl.com/jacob-alford/schemable-ts-types)
![jest coverage](./badges/coverage-jest%20coverage.svg)
![github](https://img.shields.io/github/license/jacob-alford/schemable-ts-types)

## Table of Contents

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [Disclaimer](#disclaimer)
- [Contributing](#contributing)
  - [Test Coverage](#test-coverage)
  - [Combinator Module Structure](#combinator-module-structure)
  - [Generating SchemableExt/Instances](#generating-schemableextinstances)
  - [Generating Documentation](#generating-documentation)
- [Installation](#installation)
  - [Yarn](#yarn)
  - [NPM](#npm)
- [Documentation](#documentation)
- [Schemable types explained](#schemable-types-explained)
  - [The problem:](#the-problem)
  - [The solution: Schema / Schemable](#the-solution-schema--schemable)
  - [The value of an extended Schemable](#the-value-of-an-extended-schemable)
- [Currently supported modules:](#currently-supported-modules)
<!-- AUTO-GENERATED-CONTENT:END -->

## Disclaimer

This library is in its nascent stages (< 1.0.0) and still has a lot of work ahead before it's at feature parity with `io-ts-types`, or `validators.js`.

## Contributing

### Test Coverage

This library currently has 100% jest coverage, contributions are highly encouraged and we should seek to maintain this high level of test coverage. Send over a PR!

### Combinator Module Structure

Schemable combinator modules must have a unique name and can be found in the folder whose primitive they extend, i.e. string, number, or date. A Schemable combinator module must export `Decoder`, `Eq`, `Guard`, `TaskDecoder`, and `Type` instances (named exactly), along with type aliases: `SchemableParams`, `SchemableParams1`, and `SchemableParams2C` which are the types of the exported `Decoder`, etc instances with the HKT/Kind type argument for that particular instance. Optionally, combinator modules can export convenience functions to convert to stronger types, i.e. ISODateString to SafeDate with the assumption that the guard function (isISODateString) matches the strength of the target type.

### Generating SchemableExt/Instances

Create a new combinator file using `yarn generate:template [string | number] [NameOfCombinator]`. Note: the name of the new combinator must be unique, and begin with a capital letter.

Once the new combinator modules are in place, run `yarn generate:schemables` and the ts script will update the typeclass instances and SchemableExt module with the newly created combinators. Don't forget to add tests!

### Generating Documentation

Our docs pages are automatically generated whenever a PR is merged into the `main` branch, so the following step is optional. If you want to manually re-generate the documentation pages, use `yarn docs`. This command uses [docs-ts](https://github.com/gcanti/docs-ts) and JSDoc-style annotations to parse code comments for metadata about each module.

## Installation

Uses `fp-ts`, and `io-ts` as peer dependencies. Read more about peer dependencies at [nodejs.org](https://nodejs.org/en/blog/npm/peer-dependencies/).

### Yarn

```bash
yarn add schemable-ts-types
```

### NPM

```bash
npm install schemable-ts-types
```

## Documentation

- [schemable-ts-types](https://jacob-alford.github.io/schemable-ts-types/modules/)
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

### The value of an extended Schemable

With an extended schemable typeclass you have the powerful features of `io-ts-types` (restricted to the older `Type` system) and `validators.js` (written in javascript, and more difficult to adopt in a purely functional environment) with a modern domain type declaration system, and the power of fp-ts.

Let's refine our User type.

```typescript
import { D, Eq, G, SC } from 'schemable-ts-types'

const UserSchema = SC.make(S =>
  S.struct({
    name: S.NonemptyString,
    email: S.Email,
    age: S.Natural,
    id: S.UUID({ version: 5 }),
  })
)

export type User = SC.TypeOf<UserSchema>

export const decodeUser = SC.interpreter(D.Schemable)(UserSchema)

export const eqUser = SC.interpreter(Eq.Schemable)(UserSchema)

export const guardUser = SC.interpreter(G.Schemable)(UserSchema)
```

And now we can guarantee that a user's email will conform to RFC 5322, their id will be a proper UUID-v5, and their age will not be negative.

## Currently supported modules:

| primitive | refinement                |
| --------- | ------------------------- |
| `Date`    | SafeDate.ts               |
| `number`  | Int.ts                    |
| `number`  | Natural.ts                |
| `number`  | NegativeFloat.ts          |
| `number`  | NegativeInt.ts            |
| `number`  | NonNegativeFloat.ts       |
| `number`  | PositiveFloat.ts          |
| `number`  | PositiveInt.ts            |
| `string`  | ASCII.ts                  |
| `string`  | Base64.ts                 |
| `string`  | Base64Url.ts              |
| `string`  | BtcAddress.ts             |
| `string`  | EmailAddress.ts           |
| `string`  | HexColor.ts               |
| `string`  | Hexadecimal.ts            |
| `string`  | ISODateString.ts          |
| `string`  | IntString.ts              |
| `string`  | JWT.ts                    |
| `string`  | NaturalString.ts          |
| `string`  | NegativeFloatString.ts    |
| `string`  | NegativeIntString.ts      |
| `string`  | NonNegativeFloatString.ts |
| `string`  | NonemptyString.ts         |
| `string`  | PositiveFloatString.ts    |
| `string`  | PositiveIntString.ts      |
| `string`  | UUID.ts                   |
