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

## Codec and Arbitrary

A codec is a typeclass that contains the methods of `Decoder`, `Encoder`, `JsonSerializer`, `JsonDeserializer`, and `Guard`. Decoder and encoder are lossless when composed together. This means that for all domain types for which an encoder encodes to, a decoder will return a valid `E.Right` value.

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

## Json Serializer and Deserializer

Like encoder and decoder, `JsonSerializer` and `JsonDeserializer` are lossless when composed together. Certain data types in Javascript like `NaN`, `undefined`, `Infinity`, and others are not part of the JSON specification, and `JSON.stringify` will turn these values into something different (or omit them). This means that if you stringify these types and attempt to parse, you will get a different object than you originally started with. Additionally, JSON cannot stringify `bigint`, and cannot contain circular references. Under these circumstances `JSON.stringify` will throw an error.

Anything that successfully stringifies using `JsonSerializer` will successfully parse with `JsonDeserializer` and will be equivalent objects. This is useful to avoid bugs when using JSON strings for storing data. Additionally, `JsonDeserializer` will decode the Json string into a domain type for immediate use in your program.

## Deriving JSON Schema

Schemata-ts comes with its own implementation of [JSON-Schema](https://json-schema.org/) and is a validation standard that can be used to validate artifacts in many other languages and frameworks. Schemata-ts's implementation is compatible with JSON Schema Draft 4, Draft 6, Draft 7, Draft 2019-09, and has partial support for 2020-12. _Note_: string `format` (like regex, contentType, or mediaType) is only available starting with Draft 6, and tuples are not compatible with Draft 2020-12.

### Customer JSON Schema Example

This is a live example generating a JSON Schema in `src/base/JsonSchemaBase.ts`

```ts
import * as JS from 'schemata-ts/JsonSchema'
import * as S from 'schemata-ts/schemata'
import { getJsonSchema } from 'schemata-ts/JsonSchema'

const schema = S.Struct({
  id: S.Natural,
  jwt: S.Jwt,
  tag: S.Literal('Customer'),
})

const jsonSchema = getJsonSchema(schema)

assert.deepStrictEqual(JS.stripIdentity(jsonSchema), {
  type: 'object',
  required: ['id', 'jwt', 'tag'],
  properties: {
    id: { type: 'integer', minimum: 0, maximum: 9007199254740991 },
    jwt: {
      type: 'string',
      description: 'Jwt',
      pattern:
        '^(([A-Za-z0-9_\\x2d]*)\\.([A-Za-z0-9_\\x2d]*)(\\.([A-Za-z0-9_\\x2d]*)){0,1})$',
    },
    tag: { type: 'string', const: 'Customer' },
  },
})
```

A note on `JS.stripIdentity` in the above example: internally, JSON Schema is represented as a union of Typescript classes. This is handy when inspecting the schema because the name of the schema is shown next to its properties. Because this prevents equality comparison, schemata-ts exposes a method `stripIdentity` to remove the object's class identity. _Caution_: this method stringifies and parses the schema and may throw if the schema itself contains circularity.

## Pattern Builder

Schemata-ts comes with powerful regex combinators that are used to construct regex from comprehensible atoms. The `Pattern` schema allows extension of a string schema to a subset of strings defined by a pattern. Decoders and Guards guarantee that a string conforms to the specified pattern, Arbitrary generates strings that follow the pattern, and Json Schema generates string schemata that lists the pattern as a property.

### US Phone Number Example

This is a live example validating US Phone numbers found in `src/PatternBuilder.ts`

```ts
import * as PB from 'schemata-ts/PatternBuilder'
import { pipe } from 'fp-ts/function'

const digit = PB.characterClass(false, ['0', '9'])

const areaCode = pipe(
  pipe(
    PB.char('('),
    PB.then(PB.times(3)(digit)),
    PB.then(PB.char(')')),
    PB.then(PB.maybe(PB.char(' '))),
  ),
  PB.or(PB.times(3)(digit)),
  PB.subgroup,
)

const prefix = PB.times(3)(digit)

const lineNumber = PB.times(4)(digit)

export const usPhoneNumber = pipe(
  areaCode,
  PB.then(pipe(PB.char('-'), PB.maybe)),
  PB.then(prefix),
  PB.then(PB.char('-')),
  PB.then(lineNumber),
)

assert.equal(PB.regexFromPattern(usPhoneNumber).test('(123) 456-7890'), true)
assert.equal(PB.regexFromPattern(usPhoneNumber).test('(123)456-7890'), true)
assert.equal(PB.regexFromPattern(usPhoneNumber).test('123-456-7890'), true)
assert.equal(PB.regexFromPattern(usPhoneNumber).test('1234567890'), false)
```

## Advanced Structs and Key Transformations

Schemata-ts has powerful tools for constructing domain artifacts that are strongly-typed plain javascript objects. There are a few ways to build the same schema, and some ways are more powerful than others. If, for instance, domain types are fragmented and need to compose in different ways, they can't be changed once they've been turned into schemata. `schemata-ts/struct` has built-in combinators for composing struct definitions together in elegant ways.

### Declaring a struct schema

There are a few ways to declare a struct-based schema. The first is to use the `Struct` schema exported with all the other schemata from `schemata-ts/schemata`:

```typescript
import * as E from 'fp-ts/Either'
import * as S from 'schemata-ts/schemata'
import { getDecoder } from 'schemata-ts/Decoder'

const SomeDomainType = S.Struct({
  a: S.String,
  b: S.BooleanFromNumber,
})

// SomeDomainType will have the type:
// Schema<{ a: string, b: number }, { a: string, b: boolean }>

const decoder = getDecoder(SomeDomainType)

assert.deepStrictEqual(
  decoder.decode({
    a: 'foo',
    b: 0,
  }),
  E.right({
    a: 'foo',
    b: false,
  }),
)
```

The next few ways use the `schemata-ts/struct` module to define meta-definitions of structs. Once the struct has been constructed as it needs, it can be plugged into the `StructM` schema, and used anywhere else schemata are used.

The following results in the same schema as defined in the above example:

```typescript
import * as S from 'schemata-ts/schemata'
import * as s from 'schemata-ts/struct'
import { getEncoder } from 'schemata-ts/Encoder'

const someDomainType = s.struct({
  a: S.String,
  b: S.BooleanFromNumber,
})

const SomeDomainTypeSchema = S.StructM(someDomainType)

// SomeDomainType will have the type:
// Schema<{ a: string, b: number }, { a: string, b: boolean }>

const encoder = getEncoder(SomeDomainTypeSchema)

assert.deepStrictEqual(
  encoder.encode({
    a: 'foo',
    b: false,
  }),
  {
    a: 'foo',
    b: 0,
  },
)
```

The final way to write this domain type is to use `struct.defineStruct` which differs from `struct` in that each property key must explicitly specify whether the key is required or optional.

The following results in the same schema as defined in the above two examples:

```typescript
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
// Schema<{ a: string, b: number }, { a: string, b: boolean }>

const arbitrary = getArbitrary(SomeDomainTypeSchema).arbitrary(fc)
const guard = getGuard(SomeDomainTypeSchema)

fc.assert(fc.property(arbitrary, guard.is))
```

### CamelCase Keys

As of 1.4.0, schemata-ts has built in combinators for constructing domain types where the expected input type contains mixed case keys (words separated by [any whitespace character](https://en.wikipedia.org/wiki/Whitespace_character#Unicode), hyphens, and underscores) whose output is camelCase. Like struct above, there are a few ways to do this. This first example is using the `CamelCaseFromMixed` schema of `schemata-ts/schemata`.

```typescript
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
// Schema<
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
  }),
)
```

The following example is identical to the above except it uses the `camelCaseKeys` combinator of the struct module.

```typescript
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
// Schema<
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
  },
)
```

The following example is identical to the above, except the keys being mapped to are explicitly specified using `defineStruct`:

```typescript
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
// Schema<
//   { first_name: string, last_name: string, age: number, is_married: string },
//   { firstName: string, lastName: string, age: number, isMarried: boolean }
// >

const arbitrary = getArbitrary(DatabasePerson).arbitrary(fc)
const guard = getGuard(DatabasePerson)

fc.assert(fc.property(arbitrary, guard.is))
```

Furthermore, `schemata-ts` has several utilities for working with structs:

| Name      | Description                                  |
| --------- | -------------------------------------------- |
| partial   | Marks all properties as optional             |
| complete  | Marks all properties as required             |
| pick      | Keep only specified keys                     |
| omit      | Remove specified keys                        |
| mapKeysTo | Apply a mapping function to an object's keys |
