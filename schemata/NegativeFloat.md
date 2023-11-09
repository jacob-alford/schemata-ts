---
title: NegativeFloat
nav_order: 53
parent: schemata
---

## NegativeFloat overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [NegativeFloat](#negativefloat)

---

# Number

## NegativeFloat

Negative floating point branded newtype.

Represents negative floating point numbers:

```math
 { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NegativeFloat: Schema<
  Opaque<number, FloatBrand<-1.7976931348623157e308, -5e-324>>,
  Opaque<number, FloatBrand<-1.7976931348623157e308, -5e-324>>
>
```

Added in v1.0.0
