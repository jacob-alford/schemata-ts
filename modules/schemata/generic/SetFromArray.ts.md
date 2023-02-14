---
title: schemata/generic/SetFromArray.ts
nav_order: 40
parent: Modules
---

## SetFromArray overview

An array input that's converted to a ReadonlySet. Note: does not abide the encoder <->
decoder law, but follows a less strict idempotence law.

Added in v1.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [SetFromArrayS (type alias)](#setfromarrays-type-alias)
- [utils](#utils)
  - [SetFromArray](#setfromarray)

---

# Model

## SetFromArrayS (type alias)

**Signature**

```ts
export type SetFromArrayS = <A>(ordA: Ord<A>) => <O>(sA: SchemaExt<O, A>) => SchemaExt<Array<O>, ReadonlySet<A>>
```

Added in v1.3.0

# utils

## SetFromArray

An array input that's converted to a ReadonlySet. Note: does not abide the encoder <->
decoder law, but follows a less strict idempotence law.

**Signature**

```ts
export declare const SetFromArray: SetFromArrayS
```

Added in v1.3.0
