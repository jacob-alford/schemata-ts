---
title: NonPositiveFloat
nav_order: 58
parent: schemata
---

## NonPositiveFloat overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [NonPositiveFloat](#nonpositivefloat)

---

# Number

## NonPositiveFloat

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NonPositiveFloat: Schema<
  Opaque<number, FloatBrand<-1.7976931348623157e308, -5e-324>>,
  Opaque<number, FloatBrand<-1.7976931348623157e308, -5e-324>>
>
```

Added in v1.0.0
