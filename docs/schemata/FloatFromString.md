---
title: FloatFromString
nav_order: 38
parent: schemata
---

## FloatFromString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [~~FloatFromString~~](#floatfromstring)
- [utils](#utils)
  - [FloatString (type alias)](#floatstring-type-alias)

---

# Conversion

## ~~FloatFromString~~

Floating point branded newtype from strings. Parameters: min, max are inclusive.

Represents string floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const FloatFromString: Schema<
  Opaque<string, FloatStringBrand<-1.7976931348623157e308, 1.7976931348623157e308>>,
  Opaque<number, FloatBrand<-1.7976931348623157e308, 1.7976931348623157e308>>
>
```

Added in v1.0.0

# utils

## FloatString (type alias)

A string that can safely be parsed to a floating point number.

**Signature**

```ts
export type FloatString<Min = MaxNegativeFloat, Max = MaxPositiveFloat> = Branded<string, FloatStringBrand<Min, Max>>
```

Added in v2.0.0
