---
title: schemata/number/NonPositiveFloat.ts
nav_order: 50
parent: Modules
---

## NonPositiveFloat overview

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NonPositiveFloat (type alias)](#nonpositivefloat-type-alias)
  - [NonPositiveFloatS (type alias)](#nonpositivefloats-type-alias)
- [Schema](#schema)
  - [NonPositiveFloat](#nonpositivefloat)

---

# Model

## NonPositiveFloat (type alias)

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export type NonPositiveFloat = Branded<number, NonPositiveFloatBrand>
```

Added in v1.0.0

## NonPositiveFloatS (type alias)

**Signature**

```ts
export type NonPositiveFloatS = SchemaExt<number, NonPositiveFloat>
```

Added in v1.0.0

# Schema

## NonPositiveFloat

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NonPositiveFloat: NonPositiveFloatS
```

Added in v1.0.0
