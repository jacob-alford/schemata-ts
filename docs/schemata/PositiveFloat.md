---
title: PositiveFloat
nav_order: 71
parent: schemata
---

## PositiveFloat overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [PositiveFloat](#positivefloat)

---

# Number

## PositiveFloat

Positive Float branded newtype.

Represents floating point numbers:

```math
 { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const PositiveFloat: Schema<
  Opaque<number, FloatBrand<5e-324, 1.7976931348623157e308>>,
  Opaque<number, FloatBrand<5e-324, 1.7976931348623157e308>>
>
```

Added in v1.0.0
