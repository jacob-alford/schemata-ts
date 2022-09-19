---
title: number/PositiveFloat.ts
nav_order: 9
parent: Modules
---

## PositiveFloat overview

Positive Float branded newtype.

Represents floating point numbers:

```math
 { f | f ∈ R, f > 0, f <= 2 ** 53 - 1 }
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
  - [PositiveFloat (type alias)](#positivefloat-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isPositiveFloat](#ispositivefloat)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, PositiveFloat>
```

Added in v0.0.2

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<PositiveFloat>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, PositiveFloat>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, PositiveFloat>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<PositiveFloat>
```

Added in v0.0.2

# Model

## PositiveFloat (type alias)

Positive Float branded newtype.

Represents floating point numbers:

```math
 { f | f ∈ R, f > 0, f <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type PositiveFloat = number & PositiveFloatBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, PositiveFloat>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, PositiveFloat>
```

Added in v0.0.2

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveFloat>
```

Added in v0.0.2

# Refinements

## isPositiveFloat

**Signature**

```ts
export declare const isPositiveFloat: (f: number) => f is PositiveFloat
```

Added in v0.0.2
