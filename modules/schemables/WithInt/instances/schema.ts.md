---
title: schemables/WithInt/instances/schema.ts
nav_order: 63
parent: Modules
---

## schema overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Schema](#schema)

---

# Instances

## Schema

**Signature**

```ts
export declare const Schema: (params?: IntParams | undefined) => SC.SchemaExt<number, Branded<number, IntBrand>>
```

Added in v1.0.0
