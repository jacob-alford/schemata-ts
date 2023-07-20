---
title: schemata/NonPositiveFloat.ts
nav_order: 46
parent: Modules
---

## NonPositiveFloat overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [NonPositiveFloat](#nonpositivefloat)

---

# Number

## NonPositiveFloat

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export declare const NonPositiveFloat: any
```

Added in v1.0.0
