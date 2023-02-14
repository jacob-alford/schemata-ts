---
title: schemata/number/NegativeInt.ts
nav_order: 47
parent: Modules
---

## NegativeInt overview

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NegativeInt (type alias)](#negativeint-type-alias)
  - [NegativeIntS (type alias)](#negativeints-type-alias)
- [Schema](#schema)
  - [NegativeInt](#negativeint)

---

# Model

## NegativeInt (type alias)

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

**Signature**

```ts
export type NegativeInt = Branded<number, NegativeIntBrand>
```

Added in v1.0.0

## NegativeIntS (type alias)

**Signature**

```ts
export type NegativeIntS = SchemaExt<number, NegativeInt>
```

Added in v1.0.0

# Schema

## NegativeInt

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

**Signature**

```ts
export declare const NegativeInt: NegativeIntS
```

Added in v1.0.0
