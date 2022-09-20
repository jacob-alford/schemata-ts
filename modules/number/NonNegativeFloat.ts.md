---
title: number/NonNegativeFloat.ts
nav_order: 9
parent: Modules
---

## NonNegativeFloat overview

Non-negative floating point branded newtype.

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
  - [NonNegativeFloat (type alias)](#nonnegativefloat-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonNegativeFloat](#isnonnegativefloat)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonNegativeFloat>
```

Added in v0.0.2

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonNegativeFloat>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonNegativeFloat>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonNegativeFloat>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<NonNegativeFloat>
```

Added in v0.0.2

# Model

## NonNegativeFloat (type alias)

Non-negative floating point branded newtype.

Represents non-negative floating point numbers:

```math
 { f | f ∈ ℝ, f >= 0, f <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type NonNegativeFloat = number & NonNegativeFloatBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, NonNegativeFloat>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonNegativeFloat>
```

Added in v0.0.2

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonNegativeFloat>
```

Added in v0.0.2

# Refinements

## isNonNegativeFloat

**Signature**

```ts
export declare const isNonNegativeFloat: (n: number) => n is NonNegativeFloat
```

Added in v0.0.2
