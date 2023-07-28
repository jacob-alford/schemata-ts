---
title: NegativeInt
nav_order: 51
parent: schemata
---

## NegativeInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [NegativeInt](#negativeint)

---

# Number

## NegativeInt

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

**Signature**

```ts
export declare const NegativeInt: Schema<
  Opaque<number, IntBrand<-9007199254740991, -1>>,
  Opaque<number, IntBrand<-9007199254740991, -1>>
>
```

Added in v1.0.0
