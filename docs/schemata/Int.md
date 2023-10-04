---
title: Int
nav_order: 42
parent: schemata
---

## Int overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [Int](#int)

---

# Number

## Int

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const Int: <Min extends number | undefined = undefined, Max extends number | undefined = undefined>(
  params?: NumberParams<Min, Max> | undefined
) => Schema<
  Opaque<
    number,
    IntBrand<Min extends undefined ? -9007199254740991 : Min, Max extends undefined ? 9007199254740991 : Max>
  >,
  Opaque<
    number,
    IntBrand<Min extends undefined ? -9007199254740991 : Min, Max extends undefined ? 9007199254740991 : Max>
  >
>
```

Added in v1.0.0
