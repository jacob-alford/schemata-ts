---
title: schemata/string/Ascii.ts
nav_order: 174
parent: Modules
---

## Ascii overview

A string of ASCII characters.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Ascii (type alias)](#ascii-type-alias)
  - [AsciiS (type alias)](#asciis-type-alias)
- [Pattern](#pattern)
  - [ascii](#ascii)
- [Schema](#schema)
  - [Ascii](#ascii)

---

# Model

## Ascii (type alias)

A string of ASCII characters.

**Signature**

```ts
export type Ascii = Branded<string, AsciiBrand>
```

Added in v1.0.0

## AsciiS (type alias)

**Signature**

```ts
export type AsciiS = SchemaExt<string, Ascii>
```

Added in v1.0.0

# Pattern

## ascii

**Signature**

```ts
export declare const ascii: PB.Pattern
```

Added in v1.0.0

# Schema

## Ascii

A string of ASCII characters.

**Signature**

```ts
export declare const Ascii: AsciiS
```

Added in v1.0.0
