---
title: schemata/number/BigIntFromString.ts
nav_order: 150
parent: Modules
---

## BigIntFromString overview

Represents bigints converted from strings

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [BigIntFromStringS (type alias)](#bigintfromstrings-type-alias)
- [Pattern](#pattern)
  - [bigIntString](#bigintstring)
- [utils](#utils)
  - [BigIntFromString](#bigintfromstring)
  - [BigIntFromStringParams (type alias)](#bigintfromstringparams-type-alias)

---

# Model

## BigIntFromStringS (type alias)

**Signature**

```ts
export type BigIntFromStringS = (params?: BigIntFromStringParams) => SchemaExt<string, bigint>
```

Added in v1.0.0

# Pattern

## bigIntString

**Signature**

```ts
export declare const bigIntString: PB.Pattern
```

Added in v1.0.0

# utils

## BigIntFromString

Represents bigints converted from strings

**Signature**

```ts
export declare const BigIntFromString: BigIntFromStringS
```

Added in v1.0.0

## BigIntFromStringParams (type alias)

Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and 16. It does not decode in this specified base, and accepts any base as input: 2, 8, 10, or 16.

**Signature**

```ts
export type BigIntFromStringParams = {
  readonly encodeToBase?: 2 | 8 | 10 | 16
}
```

Added in v1.0.0
