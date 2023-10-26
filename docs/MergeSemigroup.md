---
title: MergeSemigroup.ts
nav_order: 9
permalink: /merge-semigroup/
---

## MergeSemigroup overview

A typeclass which models the `getSemigroup` operation that returns a merge-wise
semigroup for a particular domain type

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Interpreters](#interpreters)
  - [deriveMergeSemigroup](#derivemergesemigroup)
- [Model](#model)
  - [MergeOptions (type alias)](#mergeoptions-type-alias)
  - [MergeSemigroup (interface)](#mergesemigroup-interface)
  - [MergeStrategy (type alias)](#mergestrategy-type-alias)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Interpreters

## deriveMergeSemigroup

Interprets a schema as a MergeSemigroup

**Signature**

```ts
export declare const deriveMergeSemigroup: Interpreter<SchemableLambda>
```

Added in v2.0.0

# Model

## MergeOptions (type alias)

Options for merging particular data types.

Note: Imap, Unions, and Literals will always use the `fallback` strategy to maintain
associativity.

**Signature**

```ts
export type MergeOptions = {
  readonly string?: Semigroup<string>
  readonly number?: Semigroup<number>
  readonly boolean?: Semigroup<boolean>
  readonly unknown?: Semigroup<unknown>
  readonly fallback: 'first' | 'last'
}
```

Added in v2.0.0

## MergeSemigroup (interface)

A typeclass which models the `getSemigroup` operation that returns a merge-wise
semigroup for a particular domain type

Default merge strategy is `last`, i.e. overwrite

**Signature**

```ts
export interface MergeSemigroup<O> {
  readonly semigroup: (mergeStrategy?: MergeStrategy) => Semigroup<O>
}
```

Added in v2.0.0

## MergeStrategy (type alias)

Determines how concrete values are concatenated

**Signature**

```ts
export type MergeStrategy = 'first' | 'last' | MergeOptions
```

Added in v2.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/MergeSemigroup'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
