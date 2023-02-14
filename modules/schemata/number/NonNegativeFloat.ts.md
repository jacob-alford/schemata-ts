---
title: schemata/number/NonNegativeFloat.ts
nav_order: 48
parent: Modules
---

## NonNegativeFloat overview

Non-negative floating point branded newtype.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NonNegativeFloat (type alias)](#nonnegativefloat-type-alias)
  - [NonNegativeFloatS (type alias)](#nonnegativefloats-type-alias)
- [Schema](#schema)
  - [NonNegativeFloat](#nonnegativefloat)

---

# Model

## NonNegativeFloat (type alias)

Non-negative floating point branded newtype.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export type NonNegativeFloat = Branded<number, NonNegativeFloatBrand>
```

Added in v1.0.0

## NonNegativeFloatS (type alias)

**Signature**

```ts
export type NonNegativeFloatS = SchemaExt<number, NonNegativeFloat>
```

Added in v1.0.0

# Schema

## NonNegativeFloat

Non-negative floating point branded newtype.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NonNegativeFloat: NonNegativeFloatS
```

Added in v1.0.0
