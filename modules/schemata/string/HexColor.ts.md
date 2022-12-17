---
title: schemata/string/HexColor.ts
nav_order: 182
parent: Modules
---

## HexColor overview

A valid hexadecimal color value.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [HexColor (type alias)](#hexcolor-type-alias)
  - [HexColorS (type alias)](#hexcolors-type-alias)
- [Pattern](#pattern)
  - [hexColor](#hexcolor)
- [Schema](#schema)
  - [HexColor](#hexcolor)

---

# Model

## HexColor (type alias)

A valid hexadecimal color value.

**Signature**

```ts
export type HexColor = Branded<string, HexColorBrand>
```

Added in v1.0.0

## HexColorS (type alias)

**Signature**

```ts
export type HexColorS = SchemaExt<string, HexColor>
```

Added in v1.0.0

# Pattern

## hexColor

/^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i

**Signature**

```ts
export declare const hexColor: PB.Pattern
```

Added in v1.0.0

# Schema

## HexColor

A valid hexadecimal color value.

**Signature**

```ts
export declare const HexColor: HexColorS
```

Added in v1.0.0
