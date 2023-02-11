---
title: schemata/number/NegativeFloat.ts
nav_order: 42
parent: Modules
---

## NegativeFloat overview

Negative floating point branded newtype.

Represents negative floating point numbers:

```math
 { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NegativeFloat (type alias)](#negativefloat-type-alias)
  - [NegativeFloatS (type alias)](#negativefloats-type-alias)
- [Schema](#schema)
  - [NegativeFloat](#negativefloat)

---

# Model

## NegativeFloat (type alias)

Negative floating point branded newtype.

Represents negative floating point numbers:

```math
 { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export type NegativeFloat = Branded<number, NegativeFloatBrand>
```

Added in v1.0.0

## NegativeFloatS (type alias)

**Signature**

```ts
export type NegativeFloatS = SchemaExt<number, NegativeFloat>
```

Added in v1.0.0

# Schema

## NegativeFloat

Negative floating point branded newtype.

Represents negative floating point numbers:

```math
 { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NegativeFloat: NegativeFloatS
```

Added in v1.0.0
