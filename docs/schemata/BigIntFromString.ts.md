---
title: schemata/BigIntFromString.ts
nav_order: 6
parent: Modules
---

## BigIntFromString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [BigIntFromString](#bigintfromstring)
- [Pattern](#pattern)
  - [bigIntString](#bigintstring)
- [utils](#utils)
  - [BigIntFromStringParams (type alias)](#bigintfromstringparams-type-alias)
  - [BigIntString (type alias)](#bigintstring-type-alias)

---

# Conversion

## BigIntFromString

Represents bigints converted from strings

**Signature**

```ts
export declare const BigIntFromString: any
```

Added in v1.0.0

# Pattern

## bigIntString

**Signature**

```ts
export declare const bigIntString: k.Pattern
```

Added in v1.0.0

# utils

## BigIntFromStringParams (type alias)

Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and 16. It does not decode in this specified base, and accepts any base as input: 2, 8, 10, or 16.

**Signature**

```ts
export type BigIntFromStringParams = {
  readonly encodeToBase?: 2 | 8 | 10 | 16
}
```

Added in v1.0.0

## BigIntString (type alias)

Represents strings that can be parsed properly by `BigInt()`

**Signature**

```ts
export type BigIntString = Branded<string, BigIntStringBrand>
```

Added in v2.0.0
