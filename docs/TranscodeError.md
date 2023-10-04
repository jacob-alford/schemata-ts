---
title: TranscodeError.ts
nav_order: 87
permalink: /transcode-error/
---

## TranscodeError overview

Represents an error ADT that occurs while encoding or decoding

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [draw](#draw)
  - [drawTree](#drawtree)
  - [fold](#fold)
  - [foldMapDepthFirst](#foldmapdepthfirst)
  - [prefixedLines](#prefixedlines)
  - [totalErrors](#totalerrors)
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

## draw

Alias for `drawTree`

**Signature**

```ts
export declare const draw: (errors: TranscodeErrors) => string
```

Added in v2.0.0

## drawTree

Draws a tree of `TranscodeErrors`

**Signature**

```ts
export declare const drawTree: (
  errors: TranscodeErrors,
  configuration?: { readonly showHeading?: boolean | undefined } | undefined
) => string
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
  readonly ErrorAtIndex: (err: ErrorAtIndex, depth: number, recurseDepthFirst: (errs: TranscodeErrors) => S) => S
  readonly ErrorAtKey: (err: ErrorAtKey, depth: number, recurseDepthFirst: (errs: TranscodeErrors) => S) => S
  readonly ErrorAtUnionMember: (
    err: ErrorAtUnionMember,
    depth: number,
    recurseDepthFirst: (errs: TranscodeErrors) => S
  ) => S
}) => (e: TranscodeErrors) => S
```

Added in v2.0.0

## foldMapDepthFirst

Flattens a `DecodeError` tree into a common Semigroup with access to the current
accumulation and current level of depth

**Signature**

```ts
export declare const foldMapDepthFirst: <S>(
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

## prefixedLines

Draws a tree of `TranscodeErrors` as lines with configurable prefix characters.

The first argument, `prefix` appends any string or character to a concrete node. The
depth represents how many generations are between the root node and the current node.
The total children represents the total number of children the current node has. If a
node has zero children, it is a concrete node; i.e. type-mismatch, unexpected value, or
serialization error. If a node has one or more children, it is a container node; i.e.
error-at-key, error-at-index, or error-at-union-member.

The second argument, `prefixChildren` appends any string or character to a child node,
which would have already been prefixed by the first argument. It will be called for
nodes that have been prefixed many times.

The third argument, `errorStrings` is a configuration object that can be used to
override the default error type templates

**Signature**

```ts
export declare const prefixedLines: (
  prefix: (depth: number, totalChildren: number) => string,
  prefixChildren?: (depth: number, childIndex: number, totalSiblings: number, innerNode: string) => string,
  errorStrings?: {
    readonly TypeMismatch?: ((expected: string, actual: unknown) => string) | undefined
    readonly UnexpectedValue?: ((actual: unknown) => string) | undefined
    readonly SerializationError?: ((expected: string, error: unknown, actual: unknown) => string) | undefined
    readonly ErrorAtIndex?: ((index: number) => string) | undefined
    readonly ErrorAtKey?: ((key: string) => string) | undefined
    readonly ErrorAtUnionMember?: ((member: number | string) => string) | undefined
  }
) => (err: TranscodeErrors) => RNEA.ReadonlyNonEmptyArray<string>
```

Added in v2.0.0

## totalErrors

Returns the total number of transcode errors

**Signature**

```ts
export declare const totalErrors: (e: TranscodeErrors) => number
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
