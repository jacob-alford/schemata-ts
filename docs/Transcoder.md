---
title: Transcoder
permalink: /transcoder
has_children: false
nav_order: 1
---

## Validation, Parsing, and Serialization

`Schemata-ts`'s typeclass for validation and parsing is called "Transcoder." Transcoders can be constructed from schemas using the following import and `deriveTranscoder`.

```ts
import { deriveTranscoder, type Transcoder } from 'schemata-ts/Transcoder'

const personTranscoder: Transcoder<PersonInput, Person> = deriveTranscoder(PersonSchema)
```

Transcoders are intended to succeed `Decoder`, `Encoder`, and `Codec` from `io-ts` v2. They contain two methods: `decode`, and `encode`. The `decode` method takes an unknown value to an fp-ts `Either` type where the failure type is a `schemata-ts` error tree called `TranscodeError`, and the success type is the output type of the schema.

#### Transformations (_Advanced_)

In addition to parsing an unknown value, Transcoder can _transform_ input types. One example is `MapFromEntries` which takes an array of key-value pairs and transforms it into a javascript `Map` type.

```ts
import * as Str from 'fp-ts/string'

const PeopleSchema = S.MapFromEntries(Str.Ord, S.String(), PersonSchema)

const peopleTranscoder: Transcoder<
  ReadonlyArray<readonly [string, PersonInput]>,
  ReadonlyMap<string, Person>
> = deriveTranscoder(PeopleSchema)
```

#### Serialization (_Advanced_)

Schemas can be turned into printer-parsers using various `Parser` schemas, such as:

```ts
// Raw Json-string
const parsePersonTranscoder: Transcoder<S.JsonString, Person> = deriveTranscoder(
  S.ParseJsonString(PersonSchema),
)
```

```ts
// Base-64 encoded Json-string
const parsePersonTranscoder: Transcoder<S.Base64, Person> = deriveTranscoder(
  S.ParseBase64String(PersonSchema),
)
```

#### Parallelized Validation (_Advanced_)

Transcoders can be parallelized using `TranscoderPar` which is a typeclass similar to Transcoder but returns `TaskEither`s instead of `Either`s. This allows for parallelized validation for schemas of multiple values like structs and arrays.

```ts
import { deriveTranscoderPar, type TranscoderPar } from 'schemata-ts/TranscoderPar'

const personTranscoderPar: TranscoderPar<PersonInput, Person> =
  deriveTranscoderPar(PersonSchema)
```
