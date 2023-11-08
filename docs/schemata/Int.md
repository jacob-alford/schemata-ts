---
title: Int
nav_order: 44
parent: schemata
---

## Int overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [Int](#int)
- [Transformations](#transformations)
  - [IntSchema (class)](#intschema-class)
    - [brand (property)](#brand-property)
    - [min (property)](#min-property)
    - [max (property)](#max-property)
    - [errorName (property)](#errorname-property)

---

# Number

## Int

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export declare const Int: <Min extends number | undefined = undefined, Max extends number | undefined = undefined>(
  params?: NumberParams<Min, Max> | undefined
) => IntSchema<Min, Max>
```

Added in v1.0.0

# Transformations

## IntSchema (class)

The IntSchema transformer class, use instead `S.Int` function to create an IntSchema

**Signature**

```ts
export declare class IntSchema<Min, Max> {
  constructor(private readonly params?: NumberParams<Min, Max>)
}
```

Added in v2.2.0

### brand (property)

Brands this Int schema with a certain brand

**Signature**

```ts
readonly brand: <Brand>() => Schema<Opaque<Opaque<number, IntBrand<Min extends undefined ? -9007199254740991 : Min, Max extends undefined ? 9007199254740991 : Max>>, Brand>, Opaque<Opaque<number, IntBrand<Min extends undefined ? -9007199254740991 : Min, Max extends undefined ? 9007199254740991 : Max>>, Brand>>
```

Added in v2.2.0

### min (property)

Sets the minimum value of the IntSchema

**Signature**

```ts
readonly min: <NewMin extends number>(minLength: NewMin) => IntSchema<NewMin, Max>
```

Added in v2.2.0

### max (property)

Sets the maximum value of the IntSchema

**Signature**

```ts
readonly max: <NewMax extends number>(maxLength: NewMax) => IntSchema<Min, NewMax>
```

Added in v2.2.0

### errorName (property)

Overrides the 'expected' field in TranscodeError > TypeMismatch

**Signature**

```ts
readonly errorName: (errorName: string) => IntSchema<Min, Max>
```

Added in v2.2.0
