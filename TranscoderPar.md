---
title: TranscoderPar.ts
nav_order: 87
permalink: /transcoder-par/
---

## TranscoderPar overview

Transcoder par is a transcoder that executes its decoding/encoding task in parallel for
transactions that are parallelizable such as for arrays and structs.

Lawful transcoders must be idempotent, and all derivable transcoders exported by
schemata (unless otherwise specified) are lawful.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [failure](#failure)
  - [success](#success)
- [Instance Methods](#instance-methods)
  - [imap](#imap)
- [Instances](#instances)
  - [Invariant](#invariant)
- [Interpreters](#interpreters)
  - [deriveTranscoderPar](#derivetranscoderpar)
- [Model](#model)
  - [TranscoderPar (interface)](#transcoderpar-interface)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Constructors

## failure

**Signature**

```ts
export declare const failure: <A>(e: TCE.TranscodeErrors) => TaskEither<TCE.TranscodeErrors, A>
```

Added in v2.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => TaskEither<TCE.TranscodeErrors, A>
```

Added in v2.0.0

# Instance Methods

## imap

**Signature**

```ts
export declare const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <I>(fa: TranscoderPar<I, A>) => TranscoderPar<I, B>
```

Added in v2.0.0

# Instances

## Invariant

**Signature**

```ts
export declare const Invariant: Invariant2<'schemata-ts/TranscoderPar'>
```

Added in v2.0.0

# Interpreters

## deriveTranscoderPar

Interprets a schema as a decoder

**Signature**

```ts
export declare const deriveTranscoderPar: <I, O>(schema: Schema<I, O>) => TranscoderPar<I, O>
```

Added in v2.0.0

# Model

## TranscoderPar (interface)

**Signature**

```ts
export interface TranscoderPar<I, O> {
  readonly decode: (u: unknown) => TaskEither<Const<TCE.TranscodeErrors, I>, O>
  readonly encode: (o: O) => TaskEither<Const<TCE.TranscodeErrors, O>, I>
}
```

Added in v2.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/TranscoderPar'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
