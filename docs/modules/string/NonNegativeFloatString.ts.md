---
title: string/NonNegativeFloatString.ts
nav_order: 27
parent: Modules
---

## NonNegativeFloatString overview

Non-negative floating point branded newtype string.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= 2 ** 53 - 1 }
```

Added in v0.0.2

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [NonNegativeFloatString (type alias)](#nonnegativefloatstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonNegativeFloatString](#isnonnegativefloatstring)
- [Utilities](#utilities)
  - [toNonNegativeFloat](#tononnegativefloat)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonNegativeFloatString>
```

Added in v0.0.2

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonNegativeFloatString>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonNegativeFloatString>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonNegativeFloatString>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<NonNegativeFloatString>
```

Added in v0.0.2

# Model

## NonNegativeFloatString (type alias)

Non-negative floating point branded newtype string.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type NonNegativeFloatString = string & NonNegativeFloatStringBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, NonNegativeFloatString>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonNegativeFloatString>
```

Added in v0.0.2

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonNegativeFloatString>
```

Added in v0.0.2

# Refinements

## isNonNegativeFloatString

**Signature**

```ts
export declare const isNonNegativeFloatString: (s: string) => s is NonNegativeFloatString
```

Added in v0.0.2

# Utilities

## toNonNegativeFloat

**Signature**

```ts
export declare const toNonNegativeFloat: (s: NonNegativeFloatString) => NonNegativeFloat
```

Added in v0.0.2