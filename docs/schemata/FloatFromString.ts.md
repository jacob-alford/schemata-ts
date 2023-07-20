---
title: schemata/FloatFromString.ts
nav_order: 25
parent: Modules
---

## FloatFromString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [FloatFromString](#floatfromstring)
- [utils](#utils)
  - [FloatString (type alias)](#floatstring-type-alias)

---

# Conversion

## FloatFromString

Floating point branded newtype from strings. Parameters: min, max are inclusive.

Represents string floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const FloatFromString: any
```

Added in v1.0.0

# utils

## FloatString (type alias)

A string that can safely be parsed to a floating point number.

**Signature**

```ts
export type FloatString = Branded<string, FloatStringBrand>
```

Added in v2.0.0
