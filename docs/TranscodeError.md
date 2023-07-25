---
title: TranscodeError.ts
nav_order: 85
permalink: /transcode-error/
---

## TranscodeError overview

Represents an error ADT that occurs while encoding or decoding

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [drawLinesWithMarkings](#drawlineswithmarkings)
  - [drawTree](#drawtree)
  - [fold](#fold)
  - [foldMap](#foldmap)
- [Instances](#instances)
  - [Semigroup](#semigroup)
- [Model](#model)
  - [ErrorAtIndex (class)](#erroratindex-class)
    - [\_tag (property)](#_tag-property)
  - [ErrorAtKey (class)](#erroratkey-class)
    - [\_tag (property)](#_tag-property-1)
  - [ErrorAtUnionMember (class)](#erroratunionmember-class)
    - [\_tag (property)](#_tag-property-2)
  - [SerializationError (class)](#serializationerror-class)
    - [\_tag (property)](#_tag-property-3)
  - [TranscodeError (type alias)](#transcodeerror-type-alias)
  - [TranscodeErrors (class)](#transcodeerrors-class)
    - [\_tag (property)](#_tag-property-4)
  - [TypeMismatch (class)](#typemismatch-class)
    - [\_tag (property)](#_tag-property-5)
  - [UnexpectedValue (class)](#unexpectedvalue-class)
    - [\_tag (property)](#_tag-property-6)

---

# Destructors

## drawLinesWithMarkings

Draws a tree of `TranscodeErrors` as lines with configurable child prefixes

**Signature**

```ts
export declare const drawLinesWithMarkings: (
  markChildren: (err: string, depth: number, isLastChild: boolean) => string,
  markParent: (parentError: string, depth: number) => string
) => (err: TranscodeErrors) => ReadonlyArray<string>
```

Added in v2.0.0

## drawTree

Draws a tree of `DecodeError` values

**Signature**

```ts
export declare const drawTree: (err: TranscodeErrors) => string
```

Added in v2.0.0

## fold

Flattens a `DecodeError` tree into a common Semigroup

**Signature**

```ts
export declare const fold: <S>(
  S: Sg.Semigroup<S>
) => (matchers: {
  readonly TypeMismatch: (e: TypeMismatch, depth: number) => S
  readonly UnexpectedValue: (e: UnexpectedValue, depth: number) => S
  readonly SerializationError: (e: SerializationError, depth: number) => S
  readonly ErrorAtIndex: (err: ErrorAtIndex, recurse: (errs: TranscodeErrors) => S, depth: number) => S
  readonly ErrorAtKey: (err: ErrorAtKey, recurse: (errs: TranscodeErrors) => S, depth: number) => S
  readonly ErrorAtUnionMember: (err: ErrorAtUnionMember, recurse: (errs: TranscodeErrors) => S, depth: number) => S
}) => (e: TranscodeErrors) => S
```

Added in v2.0.0

## foldMap

Flattens a `DecodeError` tree into a common Monoid with access to the current
accumulation and current level of depth

**Signature**

```ts
export declare const foldMap: <S>(
  S: Sg.Semigroup<S>
) => (matchers: {
  readonly TypeMismatch: (expected: string, actual: unknown, depth: number) => S
  readonly UnexpectedValue: (actual: unknown, depth: number) => S
  readonly SerializationError: (expected: string, error: unknown, actual: unknown, depth: number) => S
  readonly ErrorAtIndex: (index: number, errors: S, depth: number) => S
  readonly ErrorAtKey: (key: string, errors: S, depth: number) => S
  readonly ErrorAtUnionMember: (member: number | string, errors: S, depth: number) => S
}) => (e: TranscodeErrors) => S
```

Added in v2.0.0

# Instances

## Semigroup

**Signature**

```ts
export declare const Semigroup: Sg.Semigroup<TranscodeErrors>
```

Added in v2.0.0

# Model

## ErrorAtIndex (class)

Represents an error at a specific index

**Signature**

```ts
export declare class ErrorAtIndex {
  constructor(readonly index: number, readonly errors: TranscodeErrors)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ErrorAtIndex"
```

Added in v2.0.0

## ErrorAtKey (class)

Represents an error at a specific key

**Signature**

```ts
export declare class ErrorAtKey {
  constructor(readonly key: string, readonly errors: TranscodeErrors)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ErrorAtKey"
```

Added in v2.0.0

## ErrorAtUnionMember (class)

Represents an error that occurred for a particular union member

**Signature**

```ts
export declare class ErrorAtUnionMember {
  constructor(readonly member: number | string, readonly errors: TranscodeErrors)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ErrorAtUnionMember"
```

Added in v2.0.0

## SerializationError (class)

Represents an error serializing or deserializing a value

**Signature**

```ts
export declare class SerializationError {
  constructor(readonly expected: string, readonly error: unknown, readonly actual: unknown)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "SerializationError"
```

Added in v2.0.0

## TranscodeError (type alias)

Represents an error ADT that occurs while encoding or decoding

**Signature**

```ts
export type TranscodeError =
  | TypeMismatch
  | UnexpectedValue
  | SerializationError
  | ErrorAtIndex
  | ErrorAtKey
  | ErrorAtUnionMember
```

Added in v2.0.0

## TranscodeErrors (class)

A readonly non-empty array of transcode errors

**Signature**

```ts
export declare class TranscodeErrors {
  constructor(readonly errors: RNEA.ReadonlyNonEmptyArray<TranscodeError>)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "TranscodeErrors"
```

Added in v2.0.0

## TypeMismatch (class)

Represents a mismatched value

**Signature**

```ts
export declare class TypeMismatch {
  constructor(readonly expected: string, readonly actual: unknown)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "TypeMismatch"
```

Added in v2.0.0

## UnexpectedValue (class)

Represents an error for when a value is present but was not expected

**Signature**

```ts
export declare class UnexpectedValue {
  constructor(readonly actual: unknown)
}
```

Added in v2.0.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "UnexpectedValue"
```

Added in v2.0.0
