---
title: schemata/Float.ts
nav_order: 24
parent: Modules
---

## Float overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [Float](#float)

---

# Number

## Float

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const Float: <Min extends number | undefined = undefined, Max extends number | undefined = undefined>(
  params?: any
) => any
```

Added in v1.0.0
