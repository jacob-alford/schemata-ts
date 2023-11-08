---
title: Transcoder.ts
nav_order: 90
permalink: /transcoder/
---

## Transcoder overview

A transcoder is a data-type that `decode`s from unknown type of an expected input shape
to an output type, and `encode`s from an output type to the expected input shape. Can
be represented as printer/parsers, and transformations.

Lawful transcoders must be idempotent, and all derivable transcoders exported by
schemata (unless otherwise specified) are lawful.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [errorAtIndex](#erroratindex)
  - [errorAtKey](#erroratkey)
  - [errorAtUnionMember](#erroratunionmember)
  - [failure](#failure)
  - [serializationError](#serializationerror)
  - [success](#success)
  - [transcodeErrors](#transcodeerrors)
  - [typeMismatch](#typemismatch)
  - [unexpectedValue](#unexpectedvalue)
- [Destructors](#destructors)
  - [drawErrorTree](#drawerrortree)
- [Instance Methods](#instance-methods)
  - [imap](#imap)
- [Instances](#instances)
  - [Invariant](#invariant)
- [Interpreters](#interpreters)
  - [deriveTranscoder](#derivetranscoder)
- [Model](#model)
  - [Transcoder (interface)](#transcoder-interface)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Constructors

## errorAtIndex

A failure case at a specific index

**Signature**

```ts
export declare const errorAtIndex: (
  index: number,
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeError
```

Added in v2.0.0

## errorAtKey

A failure case at a specific key

**Signature**

```ts
export declare const errorAtKey: (
  key: string,
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeError
```

Added in v2.0.0

## errorAtUnionMember

A failure case for a union member

**Signature**

```ts
export declare const errorAtUnionMember: (
  member: string | number,
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeError
```

Added in v2.0.0

## failure

**Signature**

```ts
export declare const failure: <A>(e: TE.TranscodeErrors) => Either<TE.TranscodeErrors, A>
```

Added in v2.0.0

## serializationError

A failure case for a serialization or deserialization error

**Signature**

```ts
export declare const serializationError: (expected: string, error: unknown, actual: unknown) => TE.TranscodeError
```

Added in v2.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => Either<TE.TranscodeErrors, A>
```

Added in v2.0.0

## transcodeErrors

A collection of failure cases

**Signature**

```ts
export declare const transcodeErrors: (...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>) => TE.TranscodeErrors
```

Added in v2.0.0

## typeMismatch

A failure case for a value that does not match the expected type

**Signature**

```ts
export declare const typeMismatch: (expected: string, actual: unknown) => TE.TranscodeError
```

Added in v2.0.0

## unexpectedValue

A failure case for an unexpected value

**Signature**

```ts
export declare const unexpectedValue: (actual: unknown) => TE.TranscodeError
```

Added in v2.0.0

# Destructors

## drawErrorTree

**Signature**

```ts
export declare const drawErrorTree: (
  errors: TE.TranscodeErrors,
  configuration?: { readonly showHeading?: boolean | undefined } | undefined
) => string
```

Added in v2.0.0

# Instance Methods

## imap

**Signature**

```ts
export declare const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <I>(fa: Transcoder<I, A>) => Transcoder<I, B>
```

Added in v2.0.0

# Instances

## Invariant

**Signature**

```ts
export declare const Invariant: Invariant2<'schemata-ts/Transcoder'>
```

Added in v2.0.0

# Interpreters

## deriveTranscoder

Interprets a schema as a decoder

**Signature**

```ts
export declare const deriveTranscoder: <I, O>(schema: Schema<I, O>) => Transcoder<I, O>
```

Added in v2.0.0

# Model

## Transcoder (interface)

**Signature**

```ts
export interface Transcoder<I, O> {
  readonly decode: (u: unknown) => Either<Const<TE.TranscodeErrors, I>, O>
  readonly encode: (o: O) => Either<Const<TE.TranscodeErrors, O>, I>
}
```

Added in v2.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/Transcoder'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
