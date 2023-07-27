---
title: integer.ts
nav_order: 6
permalink: /integer/
---

## integer overview

`Integer` represents valid/safe javascript integer numbers within (and tagged with) a
certain range.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Integer (type alias)](#integer-type-alias)
  - [MaxSafeInt (type alias)](#maxsafeint-type-alias)
  - [MinSafeInt (type alias)](#minsafeint-type-alias)
- [utils](#utils)
  - [maxSafeInt](#maxsafeint)
  - [minSafeInt](#minsafeint)

---

# Model

## Integer (type alias)

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type Integer<Min extends number = MinSafeInt, Max extends number = MaxSafeInt> = Branded<
  number,
  IntBrand<Min, Max>
>
```

Added in v1.0.0

## MaxSafeInt (type alias)

The largest safe integer in JavaScript.

**Signature**

```ts
export type MaxSafeInt = 9007199254740991
```

Added in v2.0.0

## MinSafeInt (type alias)

The smallest safe integer in JavaScript.

**Signature**

```ts
export type MinSafeInt = -9007199254740991
```

Added in v2.0.0

# utils

## maxSafeInt

The largest safe integer in JavaScript.

**Signature**

```ts
export declare const maxSafeInt: 9007199254740991
```

Added in v2.0.0

## minSafeInt

The smallest safe integer in JavaScript.

**Signature**

```ts
export declare const minSafeInt: -9007199254740991
```

Added in v2.0.0
