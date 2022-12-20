---
title: schemata/string/RGB.ts
nav_order: 60
parent: Modules
---

## RGB overview

Represents strings which are valid RGB colors. Permits both absolute and percentage based values.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [RGB (type alias)](#rgb-type-alias)
  - [RGBS (type alias)](#rgbs-type-alias)
- [Pattern](#pattern)
  - [RGBPattern](#rgbpattern)
- [Schema](#schema)
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

## RGBS (type alias)

**Signature**

```ts
export type RGBS = SchemaExt<string, RGB>
```

Added in v1.0.0

# Pattern

## RGBPattern

**Signature**

```ts
export declare const RGBPattern: PB.Pattern
```

Added in v1.0.0

# Schema

## RGB

Represents strings which are valid RGB colors. Permits both absolute and percentage based values.

**Signature**

```ts
export declare const RGB: RGBS
```

Added in v1.0.0
