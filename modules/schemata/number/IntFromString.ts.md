---
title: schemata/number/IntFromString.ts
nav_order: 44
parent: Modules
---

## IntFromString overview

Integer branded newtype from string. Parameters: min, max are inclusive.

Note: has an optional `encodeToBase` parameter that controls the output base of the
encoded string. Currently only decodes binary, octal, decimal, and hexadecimal input
bases. It decodes in any base, and encodes to supplied parameter defaulting to decimal.

_Note_: Does not currently allow exponential notation (e.g. `0x123e4`).

Represents string-integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [IntFromStringS (type alias)](#intfromstrings-type-alias)
- [Pattern](#pattern)
  - [intFromString](#intfromstring)
- [Schema](#schema)
  - [IntFromString](#intfromstring)
- [utils](#utils)
  - [IntFromStringParams (type alias)](#intfromstringparams-type-alias)

---

# Model

## IntFromStringS (type alias)

**Signature**

```ts
export type IntFromStringS = (params?: Int.IntParams & IntFromStringParams) => SchemaExt<string, Int.Int>
```

Added in v1.0.0

# Pattern

## intFromString

**Signature**

```ts
export declare const intFromString: PB.Pattern
```

Added in v1.0.0

# Schema

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
export declare const IntFromString: IntFromStringS
```

Added in v1.0.0

# utils

## IntFromStringParams (type alias)

Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and 16
due to constraints using `Number` as a parser. It does not decode in this specified
base, and accepts any base as input: 2, 8, 10, or 16.

**Signature**

```ts
export type IntFromStringParams = {
  readonly encodeToBase?: 2 | 8 | 10 | 16
}
```

Added in v1.0.0
