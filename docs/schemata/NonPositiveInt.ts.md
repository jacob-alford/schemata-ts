---
title: schemata/NonPositiveInt.ts
nav_order: 47
parent: Modules
---

## NonPositiveInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [NonPositiveInt](#nonpositiveint)

---

# Number

## NonPositiveInt

NonPositive integer branded newtype.

Represents integers which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
```

**Signature**

```ts
export declare const NonPositiveInt: any
```

Added in v1.0.0