---
title: schemata/Float.ts
nav_order: 34
parent: schemata
---

## Float overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [Float](#float)

---

# Number

## Float

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const Float: <Min extends number | undefined = undefined, Max extends number | undefined = undefined>(
  params?: NumberParams<Min, Max> | undefined
) => Schema<
  Opaque<
    number,
    FloatBrand<
      Min extends undefined ? -1.7976931348623157e308 : Min,
      Max extends undefined ? 1.7976931348623157e308 : Max
    >
  >,
  Opaque<
    number,
    FloatBrand<
      Min extends undefined ? -1.7976931348623157e308 : Min,
      Max extends undefined ? 1.7976931348623157e308 : Max
    >
  >
>
```

Added in v1.0.0
