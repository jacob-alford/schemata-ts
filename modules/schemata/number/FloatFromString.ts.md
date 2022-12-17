---
title: schemata/number/FloatFromString.ts
nav_order: 164
parent: Modules
---

## FloatFromString overview

Floating point branded newtype from strings. Parameters: min, max are inclusive.

Note: doesn't technically product lawful encoder / decoders because `toString` is not
symmetric with `Number`.

Represents string floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [FloatFromStringS (type alias)](#floatfromstrings-type-alias)
- [Schema](#schema)
  - [FloatFromString](#floatfromstring)

---

# Model

## FloatFromStringS (type alias)

**Signature**

```ts
export type FloatFromStringS = (params?: Float.FloatParams) => SchemaExt<string, Float.Float>
```

Added in v1.0.0

# Schema

## FloatFromString

Floating point branded newtype from strings. Parameters: min, max are inclusive.

Represents string floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const FloatFromString: FloatFromStringS
```

Added in v1.0.0
