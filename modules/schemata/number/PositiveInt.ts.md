---
title: schemata/number/PositiveInt.ts
nav_order: 173
parent: Modules
---

## PositiveInt overview

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [PositiveInt (type alias)](#positiveint-type-alias)
  - [PositiveIntS (type alias)](#positiveints-type-alias)
- [Schema](#schema)
  - [PositiveInt](#positiveint)

---

# Model

## PositiveInt (type alias)

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type PositiveInt = Branded<number, PositiveIntBrand>
```

Added in v1.0.0

## PositiveIntS (type alias)

**Signature**

```ts
export type PositiveIntS = SchemaExt<number, PositiveInt>
```

Added in v1.0.0

# Schema

## PositiveInt

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const PositiveInt: PositiveIntS
```

Added in v1.0.0
