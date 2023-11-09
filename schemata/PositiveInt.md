---
title: PositiveInt
nav_order: 75
parent: schemata
---

## PositiveInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [PositiveInt](#positiveint)

---

# Number

## PositiveInt

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const PositiveInt: Schema<
  Opaque<number, IntBrand<1, 9007199254740991>>,
  Opaque<number, IntBrand<1, 9007199254740991>>
>
```

Added in v1.0.0
