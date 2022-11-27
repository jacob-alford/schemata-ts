---
title: schemata/number/Natural.ts
nav_order: 153
parent: Modules
---

## Natural overview

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Natural (type alias)](#natural-type-alias)
  - [NaturalS (type alias)](#naturals-type-alias)
- [Schema](#schema)
  - [Natural](#natural)

---

# Model

## Natural (type alias)

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type Natural = Branded<number, NaturalBrand>
```

Added in v1.0.0

## NaturalS (type alias)

**Signature**

```ts
export type NaturalS = SchemaExt<number, Natural>
```

Added in v1.0.0

# Schema

## Natural

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const Natural: NaturalS
```

Added in v1.0.0
