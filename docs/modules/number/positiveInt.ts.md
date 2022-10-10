---
title: number/positiveInt.ts
nav_order: 19
parent: Modules
---

## positiveInt overview

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [PositiveInt (type alias)](#positiveint-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isPositiveInt](#ispositiveint)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<PositiveInt>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, PositiveInt>
```

Added in v0.0.1

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<number, PositiveInt>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<PositiveInt>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, PositiveInt>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, PositiveInt>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<PositiveInt>
```

Added in v0.0.1

# Model

## PositiveInt (type alias)

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type PositiveInt = number & PositiveIntBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, number, PositiveInt>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, PositiveInt>
```

Added in v0.0.1

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, number, PositiveInt>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveInt>
```

Added in v0.0.1

# Refinements

## isPositiveInt

**Signature**

```ts
export declare function isPositiveInt(n: number): n is PositiveInt
```

Added in v0.0.1
