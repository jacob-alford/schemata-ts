---
title: Ascii
nav_order: 13
parent: schemata
---

## Ascii overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Ascii (type alias)](#ascii-type-alias)
- [Pattern](#pattern)
  - [ascii](#ascii)
- [String](#string)
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

# Pattern

## ascii

**Signature**

```ts
export declare const ascii: k.Pattern
```

Added in v1.0.0

# String

## Ascii

A string of ASCII characters.

**Signature**

```ts
export declare const Ascii: Schema<Opaque<string, AsciiBrand>, Opaque<string, AsciiBrand>>
```

Added in v1.0.0
