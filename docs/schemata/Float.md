---
title: Float
nav_order: 36
parent: schemata
---

## Float overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Number](#number)
  - [Float](#float)
- [Transformations](#transformations)
  - [FloatSchema (class)](#floatschema-class)
    - [brand (property)](#brand-property)
    - [min (property)](#min-property)
    - [max (property)](#max-property)
    - [errorName (property)](#errorname-property)

---

# Number

## Float

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export declare const Float: <Min extends number | undefined = undefined, Max extends number | undefined = undefined>(
  params?: NumberParams<Min, Max> | undefined
) => FloatSchema<Min, Max>
```

Added in v1.0.0

# Transformations

## FloatSchema (class)

The StringSchema transformer class, use instead `S.String` function to create a StringSchema

**Signature**

```ts
export declare class FloatSchema<Min, Max> {
  constructor(private readonly params?: NumberParams<Min, Max>)
}
```

Added in v2.2.0

### brand (property)

Brands this string schema with a certain brand

**Signature**

```ts
readonly brand: <Brand>() => Schema<Opaque<Opaque<number, FloatBrand<Min extends undefined ? -1.7976931348623157e+308 : Min, Max extends undefined ? 1.7976931348623157e+308 : Max>>, Brand>, Opaque<Opaque<number, FloatBrand<Min extends undefined ? -1.7976931348623157e+308 : Min, Max extends undefined ? 1.7976931348623157e+308 : Max>>, Brand>>
```

Added in v2.2.0

### min (property)

Sets the minimum required length of the string

**Signature**

```ts
readonly min: <NewMin extends number>(minLength: NewMin) => FloatSchema<NewMin, Max>
```

Added in v2.2.0

### max (property)

Sets the maximum required length of the string

**Signature**

```ts
readonly max: <NewMax extends number>(maxLength: NewMax) => FloatSchema<Min, NewMax>
```

Added in v2.2.0

### errorName (property)

Overrides the 'expected' field in TranscodeError > TypeMismatch

**Signature**

```ts
readonly errorName: (errorName: string) => FloatSchema<Min, Max>
```

Added in v2.2.0
