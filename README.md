<br>
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/jacob-alford/schemata-ts/main/assets/schemata-purple.png">
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jacob-alford/schemata-ts/main/assets/schemata-white.png">
    <img alt="schemata-ts" src="https://raw.githubusercontent.com/jacob-alford/schemata-ts/main/assets/schemata-blue.png">
  </picture>
</div>
<br>
<h1 align="center">
🔭&nbsp;&nbsp;&nbsp;schemata-ts
</h1>

<p align="center">
An all-inclusive schema engine featuring schemata inspired by io-ts and validators.js.  Written for TypeScript with fp-ts
</p>

<br><br>

<div align="center">

<img alt="npm" src="https://img.shields.io/npm/v/schemata-ts?style=for-the-badge&logo=npm">
&nbsp;
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-4.5%2B-blue?style=for-the-badge&logo=TypeScript">
&nbsp;

</div>
<div align="center">

<img alt="npm" src="https://img.shields.io/npm/dt/schemata-ts?style=for-the-badge">
&nbsp;
<img alt="Coveralls branch" src="https://img.shields.io/coverallsCoverage/github/jacob-alford/schemata-ts?style=for-the-badge">
&nbsp;
<img alt="GitHub" src="https://img.shields.io/github/license/jacob-alford/schemata-ts?style=for-the-badge">
&nbsp;

</div>
<div align="center">

<img alt="Static Badge" src="https://img.shields.io/badge/ESM-Supported-success?style=for-the-badge&logo=JavaScript">
&nbsp;
<img alt="Static Badge" src="https://img.shields.io/badge/CJS-supported-success?style=for-the-badge&logo=Node.JS">
&nbsp;

</div>

<br><br>

<div align="center">
  <a href="https://jacob-alford.github.io/schemata-ts/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/schemata-ts">npm</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/jacob-alford/schemata-ts/issues/new">Issues</a>
  <br />
</div>

<br><br>

# Welcome

`Schemata-ts` is an unofficial continuation of `io-ts` v2 built from the ground up using the highly extensible `Schemable`/`Schema` API. Schemata also comes with a suite of string validation schemas and branded types — powered by [Kuvio](https://github.com/skeate/kuvio) — all inspired by io-ts-types and validators.js.

|     | Features                                                                               |
| --- | -------------------------------------------------------------------------------------- |
| ✅  | [Validation, Parsing, and Serialization](#validation-parsing-and-serialization)        |
| ✅  | [Type Guards](#type-guards)                                                            |
| ✅  | [Json-Schema Draft 07, 2019-09, and 2020-12](#json-schema-draft-7-2019-09-and-2020-12) |
| ✅  | [Fast-Check Arbitraries](#fast-check-arbitraries)                                      |
| ✅  | [and more](#and-more)                                                                  |

## Installation

### Yarn

```console
yarn add schemata-ts
```

### NPM

```console
npm install schemata-ts
```

### PNPM

```console
pnpm add schemata-ts
```

**A note on fast-check:** Schemata lists `fast-check` as a peer dependency. As a result, it doesn't need to be installed for schemata to work. It is recommended to install `fast-check` as a dev dependency which will satisfy the peer dependency requirement. To avoid fast-check being bundled in a front-end application, only import from the `Arbitrary` module in test files.

## Schema

A `Schema` is a simple function that's architected using service-oriented principles. It's a function that takes a `Schemable` which is an interface of capabilities that produce a particular data-type. Schemas aren't intended to be constructed by users of the library but instead are pre-constructed and exported from the root directory.

The following import will give you access to all of the pre-constructed schemas.

```ts
import * as S from 'schemata-ts'
```

In addition to "primitive" schemas like `S.String(params?)`, `S.Int(params?)`, `S.Boolean`, schemata-ts also exports schema _combinators_ from the root directory. 'Combinator' is a fancy word for a function that takes one or more schemas and returns a new schema. For example, `S.Array(S.String())` is a schema over an array of strings, and `S.Struct({ foo: S.String() })` is a schema over an object with a single property `foo` which is a string.

- [Docs](https://jacob-alford.github.io/schemata-ts/schema)
- [Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/Schema.ts)
- [View All Schemata](https://jacob-alford.github.io/schemata-ts/schemata)
- [All Schemata Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/schemata)

### Schema Example

```ts
import * as S from 'schemata-ts'

export const PersonSchema = S.Struct({
  name: S.String(),
  age: S.Int({ min: 0, max: 120 }),
  isCool: S.Boolean,
  favoriteColors: S.Array(S.String()),
})
```

## Schema Transformations

There are three ways to transform a schema in `schemata-ts`: ['combinators'](#schema) which are functions that take schemas as parameters and return new schemas, 'transformers' which are specific to particular schemata, and `Imap` which applies an invariant transformation to the underlying data-type.

### Invariant Transformations

Aside from `Guard`, all data-types derivable from schemas are invariant functors. This means that supplying mapping functions `to` and `from` to `Imap` adjusts the `Output` of that particular data type. Because `Guard` is not invariant, you must supply the resulting `Guard` to the invariant map. The combinator version of this is `Imap`. In version `3.0` (coming late 2023/early 2024) it will be possible to `.imap()` any schema.

### Schema Transformers

Schema transformers are classes which extend `SchemaImplementation`, and allow adjustment to the underlying schema parameters after it has been declared in an immutable fashion. This is useful for type-specific methods like `pick` or `omit` for `Struct`.

Here are the current transformers and available methods,

- Struct: `pick`, `omit`, `partial`, `partialOption`, `readonly`, `strict`, `addIndexSignature`, `extend`, `intersect`
- Array: `minLength`, `maxLength`, `nonEmpty`
- String: `brand`, `minLength`, `maxLength`, `errorName`
- Int: `brand`, `min`, `max`, `errorName`
- Float: `brand`, `min`, `max`, `errorName`
- Tuple: `append`, `prepend`

... with more to come!

### Transformation Example

```typescript
const SoftwareDeveloperSchema = PersonSchema.omit('isCool')
  .extend({
    favoriteLanguages: S.Array(S.String()),
    favoriteFrameworks: S.Array(S.String()),
  })
  .strict()
```

## TypeScript Types

Schemas can be used to extract the underlying TypeScript type to avoid writing the same definition twice and different parts of code getting out of sync.

Schemas have reference to both the input and output type. The input type is more often for usage outside of JavaScript land (such as over the wire in an API request), and the output type is more often for usage within JavaScript land.

```ts
export type Person = S.OutputOf<typeof PersonSchema>

export type PersonInput = S.InputOf<typeof PersonSchema>
```

## Validation, Parsing, and Serialization

`Schemata-ts`'s type-class for validation and parsing is called "Transcoder." Transcoders can be derived from schemas using `deriveTranscoder`:

```ts
import { deriveTranscoder, type Transcoder } from 'schemata-ts/Transcoder'

const personTranscoder: Transcoder<PersonInput, Person> = deriveTranscoder(PersonSchema)
```

Transcoders are intended to succeed `Decoder`, `Encoder`, and `Codec` from `io-ts` v2. They contain two methods: `decode` and `encode`. The `decode` method takes an unknown value to an fp-ts `Either` type where the failure type is a `schemata-ts` error tree called `TranscodeError`, and the success type is the output type of the schema.

- [Documentation](https://jacob-alford.github.io/schemata-ts/transcoder)
- [Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/Transcoder.ts)

### Transcoder Transformations (_Advanced_)

In addition to parsing an unknown value, Transcoder can _transform_ input types. One example is `MapFromEntries` which takes an array of key-value pairs and transforms it into a JavaScript `Map` type.

```ts
import * as Str from 'fp-ts/string'

const PeopleSchema = S.MapFromEntries(Str.Ord, S.String(), PersonSchema)

const peopleTranscoder: Transcoder<
  ReadonlyArray<readonly [string, PersonInput]>,
  ReadonlyMap<string, Person>
> = deriveTranscoder(PeopleSchema)
```

### Transcoder Serialization (_Advanced_)

Schemas can be turned into printer-parsers using various `Parser` schemas, such as:

(De)Serialization from Json String:

```ts
const parsePersonTranscoder: Transcoder<S.JsonString, Person> = deriveTranscoder(
  S.ParseJsonString(PersonSchema),
)
```

or, (De)Serialization from a Base-64 encoded Json String:

```ts
const parsePersonTranscoder: Transcoder<S.Base64, Person> = deriveTranscoder(
  S.ParseBase64Json(PersonSchema),
)
```

### Transcoder Parallelized Validation (_Advanced_)

Transcoders can be parallelized using `TranscoderPar` which is a typeclass similar to Transcoder but returns `TaskEither`s instead of `Either`s. This allows for parallelized validation for schemas of multiple values like structs and arrays.

```ts
import { deriveTranscoderPar, type TranscoderPar } from 'schemata-ts/TranscoderPar'

const personTranscoderPar: TranscoderPar<PersonInput, Person> =
  deriveTranscoderPar(PersonSchema)
```

### Transcoder Documentation

- [Documentation](https://jacob-alford.github.io/schemata-ts/transcoder-par)
- [Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/TranscoderPar.ts)

## Type Guards

Type guards are used by TypeScript to narrow the type of a value to something concrete. Guards can be derived from schemas using `deriveGuard`:

```ts
import { deriveGuard, type Guard } from 'schemata-ts/Guard'

const guardPerson: Guard<Person> = deriveGuard(PersonSchema)
```

### Type Guard Documentation

- [Documentation](https://jacob-alford.github.io/schemata-ts/guard)
- [Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/Guard.ts)

## JSON Schema (Draft 7, 2019-09, and 2020-12)

Json-Schema is a standard for describing JSON data. Schemata-ts can derive Json-Schema from schemas using `deriveJsonSchema` for versions Draft-07, 2019-09, and 2020-12.

```ts
import { deriveJsonSchema } from 'schemata-ts/JsonSchema'

const personJsonSchemaDraft07 = deriveJsonSchema(PersonSchema, 'Draft-07')
const personJsonSchema2019 = deriveJsonSchema(PersonSchema)
const personJsonSchema2020 = deriveJsonSchema(PersonSchema, '2020-12')
```

### JSON Schema Documentation

- [Documentation](https://jacob-alford.github.io/schemata-ts/json-schema)
- [Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/JsonSchema.ts)
- [Specification](https://json-schema.org/specification)

## Fast-Check Arbitraries

Fast-Check is a property-based testing library for JavaScript. Schemata-ts can derive fast-check arbitraries from schemas using `deriveArbitrary`:

```ts
import * as fc from 'fast-check'
import { deriveArbitrary } from 'schemata-ts/Arbitrary'

const personArbitrary = deriveArbitrary(PersonSchema).arbitrary(fc)
```

### Arbitrary Documentation

- [Documentation](https://jacob-alford.github.io/schemata-ts/arbitrary)
- [Source](https://github.com/jacob-alford/schemata-ts/tree/main/src/Arbitrary.ts)
- [Fast-Check](https://github.com/dubzzz/fast-check)

## And more

Schemata has other derivations besides the ones above, below are links to those places in the documentation.

- [MergeSemigroup](https://jacob-alford.github.io/schemata-ts/merge-semigroup): A customizable schema specific deep-merge ([source](https://github.com/jacob-alford/schemata-ts/tree/main/src/MergeSemigroup.ts))
- [Eq](https://jacob-alford.github.io/schemata-ts/eq): A schema-specific equality check ([source](https://github.com/jacob-alford/schemata-ts/tree/main/src/Eq.ts))
- [TypeString](https://jacob-alford.github.io/schemata-ts/type-string): Input / Output type strings ([source](https://github.com/jacob-alford/schemata-ts/tree/main/src/TypeString.ts))

# Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jacob-alford"><img src="https://avatars.githubusercontent.com/u/7153123?v=4?s=100" width="100px;" alt="Jacob Alford"/><br /><sub><b>Jacob Alford</b></sub></a><br /><a href="https://github.com/jacob-alford/schemata-ts/commits?author=jacob-alford" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/newswim"><img src="https://avatars.githubusercontent.com/u/6667096?v=4?s=100" width="100px;" alt="Dan Minshew"/><br /><sub><b>Dan Minshew</b></sub></a><br /><a href="https://github.com/jacob-alford/schemata-ts/commits?author=newswim" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://skeate.dev"><img src="https://avatars.githubusercontent.com/u/387382?v=4?s=100" width="100px;" alt="Jonathan Skeate"/><br /><sub><b>Jonathan Skeate</b></sub></a><br /><a href="https://github.com/jacob-alford/schemata-ts/commits?author=skeate" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/0x706b"><img src="https://avatars.githubusercontent.com/u/20319430?v=4?s=100" width="100px;" alt="Peter Krol"/><br /><sub><b>Peter Krol</b></sub></a><br /><a href="https://github.com/jacob-alford/schemata-ts/commits?author=0x706b" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/golergka"><img src="https://avatars.githubusercontent.com/u/929735?v=4?s=100" width="100px;" alt="golergka"/><br /><sub><b>golergka</b></sub></a><br /><a href="https://github.com/jacob-alford/schemata-ts/commits?author=golergka" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
