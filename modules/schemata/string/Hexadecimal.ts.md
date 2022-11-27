---
title: schemata/string/Hexadecimal.ts
nav_order: 168
parent: Modules
---

## Hexadecimal overview

A string of hexadecimal characters.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Hexadecimal (type alias)](#hexadecimal-type-alias)
  - [HexadecimalS (type alias)](#hexadecimals-type-alias)
- [Pattern](#pattern)
  - [hexadecimal](#hexadecimal)
- [Schema](#schema)
  - [Hexadecimal](#hexadecimal)

---

# Model

## Hexadecimal (type alias)

A string of hexadecimal characters.

**Signature**

```ts
export type Hexadecimal = Branded<string, HexadecimalBrand>
```

Added in v1.0.0

## HexadecimalS (type alias)

**Signature**

```ts
export type HexadecimalS = SchemaExt<string, Hexadecimal>
```

Added in v1.0.0

# Pattern

## hexadecimal

**Signature**

```ts
export declare const hexadecimal: PB.Pattern
```

Added in v1.0.0

# Schema

## Hexadecimal

A string of hexadecimal characters.

**Signature**

```ts
export declare const Hexadecimal: HexadecimalS
```

Added in v1.0.0
