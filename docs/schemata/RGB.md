---
title: RGB
nav_order: 79
parent: schemata
---

## RGB overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [RGB (type alias)](#rgb-type-alias)
- [String](#string)
  - [RGB](#rgb)

---

# Model

## RGB (type alias)

Represents strings which are valid RGB colors. Permits both absolute and percentage based values.

**Signature**

```ts
export type RGB = Branded<string, RGBBrand>
```

Added in v1.0.0

# String

## RGB

Represents strings which are valid RGB colors. Permits both absolute and percentage based values.

**Signature**

```ts
export declare const RGB: Schema<Opaque<string, RGBBrand>, Opaque<string, RGBBrand>>
```

Added in v1.0.0
