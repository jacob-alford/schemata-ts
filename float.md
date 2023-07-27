---
title: float.ts
nav_order: 4
permalink: /float/
---

## float overview

`float` represents valid javascript floating point numbers within (and tagged with) a
certain range

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Float (type alias)](#float-type-alias)
  - [MaxNegativeFloat (type alias)](#maxnegativefloat-type-alias)
  - [MaxPositiveFloat (type alias)](#maxpositivefloat-type-alias)
  - [MinNegativeFloat (type alias)](#minnegativefloat-type-alias)
  - [MinPositiveFloat (type alias)](#minpositivefloat-type-alias)
- [utils](#utils)
  - [maxNegativeFloat](#maxnegativefloat)
  - [maxPositiveFloat](#maxpositivefloat)
  - [minNegativeFloat](#minnegativefloat)
  - [minPositiveFloat](#minpositivefloat)

---

# Model

## Float (type alias)

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export type Float<Min extends number = MaxNegativeFloat, Max extends number = MaxPositiveFloat> = Branded<
  number,
  FloatBrand<Min, Max>
>
```

Added in v1.0.0

## MaxNegativeFloat (type alias)

The largest negative float in JavaScript.

**Signature**

```ts
export type MaxNegativeFloat = -1.7976931348623157e308
```

Added in v2.0.0

## MaxPositiveFloat (type alias)

The largest positive float in JavaScript.

**Signature**

```ts
export type MaxPositiveFloat = 1.7976931348623157e308
```

Added in v2.0.0

## MinNegativeFloat (type alias)

The smallest negative float in JavaScript.

**Signature**

```ts
export type MinNegativeFloat = -5e-324
```

Added in v2.0.0

## MinPositiveFloat (type alias)

The smallest positive float in JavaScript.

**Signature**

```ts
export type MinPositiveFloat = 5e-324
```

Added in v2.0.0

# utils

## maxNegativeFloat

The largest negative float in JavaScript.

**Signature**

```ts
export declare const maxNegativeFloat: -1.7976931348623157e308
```

Added in v2.0.0

## maxPositiveFloat

The largest positive float in JavaScript.

**Signature**

```ts
export declare const maxPositiveFloat: 1.7976931348623157e308
```

Added in v2.0.0

## minNegativeFloat

The smallest negative float in JavaScript.

**Signature**

```ts
export declare const minNegativeFloat: -5e-324
```

Added in v2.0.0

## minPositiveFloat

The smallest positive float in JavaScript.

**Signature**

```ts
export declare const minPositiveFloat: 5e-324
```

Added in v2.0.0
