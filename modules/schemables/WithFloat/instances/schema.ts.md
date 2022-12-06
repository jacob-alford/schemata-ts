---
title: schemables/WithFloat/instances/schema.ts
nav_order: 54
parent: Modules
---

## schema overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
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
export declare const Schema: (params?: FloatParams | undefined) => SC.SchemaExt<number, Branded<number, FloatBrand>>
```

Added in v1.0.0
