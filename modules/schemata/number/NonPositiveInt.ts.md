---
title: schemata/number/NonPositiveInt.ts
nav_order: 158
parent: Modules
---

## NonPositiveInt overview

NonPositive integer branded newtype.

Represents integers which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NonPositiveInt (type alias)](#nonpositiveint-type-alias)
  - [NonPositiveIntS (type alias)](#nonpositiveints-type-alias)
- [Schema](#schema)
  - [NonPositiveInt](#nonpositiveint)

---

# Model

## NonPositiveInt (type alias)

NonPositive integer branded newtype.

Represents integers which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
```

**Signature**

```ts
export type NonPositiveInt = Branded<number, NonPositiveIntBrand>
```

Added in v1.0.0

## NonPositiveIntS (type alias)

**Signature**

```ts
export type NonPositiveIntS = SchemaExt<number, NonPositiveInt>
```

Added in v1.0.0

# Schema

## NonPositiveInt

NonPositive integer branded newtype.

Represents integers which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
```

**Signature**

```ts
export declare const NonPositiveInt: NonPositiveIntS
```

Added in v1.0.0
