---
title: schemata/generic/NonEmptyArray.ts
nav_order: 32
parent: Modules
---

## NonEmptyArray overview

A read-only Array containing one or more elements.

Added in v1.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NonEmptyArrayS (type alias)](#nonemptyarrays-type-alias)
- [Schema](#schema)
  - [NonEmptyArray](#nonemptyarray)

---

# Model

## NonEmptyArrayS (type alias)

**Signature**

```ts
export type NonEmptyArrayS = <A, O>(sA: SchemaExt<O, A>) => SchemaExt<Array<O>, RNEA.ReadonlyNonEmptyArray<A>>
```

Added in v1.1.0

# Schema

## NonEmptyArray

A read-only Array containing one or more elements.

**Signature**

```ts
export declare const NonEmptyArray: NonEmptyArrayS
```

Added in v1.1.0
