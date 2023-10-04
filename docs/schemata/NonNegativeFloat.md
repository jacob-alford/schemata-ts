---
title: NonNegativeFloat
nav_order: 56
parent: schemata
---

## NonNegativeFloat overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [NonNegativeFloat](#nonnegativefloat)

---

# Number

## NonNegativeFloat

Non-negative floating point branded newtype.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NonNegativeFloat: Schema<
  Opaque<number, FloatBrand<0, 1.7976931348623157e308>>,
  Opaque<number, FloatBrand<0, 1.7976931348623157e308>>
>
```

Added in v1.0.0
