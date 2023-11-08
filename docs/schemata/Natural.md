---
title: Natural
nav_order: 52
parent: schemata
---

## Natural overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [Natural](#natural)

---

# Number

## Natural

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const Natural: Schema<
  Opaque<number, IntBrand<0, 9007199254740991>>,
  Opaque<number, IntBrand<0, 9007199254740991>>
>
```

Added in v1.0.0
