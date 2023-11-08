---
title: IntFromString
nav_order: 46
parent: schemata
---

## IntFromString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [IntFromString](#intfromstring)
- [Pattern](#pattern)
  - [intFromString](#intfromstring)
- [utils](#utils)
  - [IntString (type alias)](#intstring-type-alias)

---

# Conversion

## IntFromString

Integer branded newtype from string. Parameters: min, max are inclusive.

Note: has an optional `encodeToBase` parameter that controls the output base of the
encoded string. Currently only decodes binary, octal, decimal, and hexadecimal input
bases. It decodes in any base, and encodes to supplied parameter defaulting to decimal.

_Note_: Does not currently allow exponential notation (e.g. `0x123e4`).

Represents string-integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const IntFromString: Schema<
  Opaque<string, IntStringBrand>,
  Opaque<number, IntBrand<-9007199254740991, 9007199254740991>>
>
```

Added in v1.0.0

# Pattern

## intFromString

**Signature**

```ts
export declare const intFromString: k.Pattern
```

Added in v1.0.0

# utils

## IntString (type alias)

A string that can safely be parsed to a floating point number.

**Signature**

```ts
export type IntString = Branded<string, IntStringBrand>
```

Added in v2.0.0
