---
title: schemata/number/PositiveFloat.ts
nav_order: 171
parent: Modules
---

## PositiveFloat overview

Positive Float branded newtype.

Represents floating point numbers:

```math
 { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [PositiveFloat (type alias)](#positivefloat-type-alias)
  - [PositiveFloatS (type alias)](#positivefloats-type-alias)
- [Schema](#schema)
  - [PositiveFloat](#positivefloat)

---

# Model

## PositiveFloat (type alias)

Positive Float branded newtype.

Represents floating point numbers:

```math
 { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export type PositiveFloat = Branded<number, PositiveFloatBrand>
```

Added in v1.0.0

## PositiveFloatS (type alias)

**Signature**

```ts
export type PositiveFloatS = SchemaExt<number, PositiveFloat>
```

Added in v1.0.0

# Schema

## PositiveFloat

Positive Float branded newtype.

Represents floating point numbers:

```math
 { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const PositiveFloat: PositiveFloatS
```

Added in v1.0.0
