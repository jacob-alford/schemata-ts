---
title: number/negativeInt.ts
nav_order: 11
parent: Modules
---

## negativeInt overview

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
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
  - [NegativeInt (type alias)](#negativeint-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNegativeInt](#isnegativeint)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NegativeInt>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NegativeInt>
```

Added in v0.0.1

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<number, NegativeInt>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NegativeInt>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NegativeInt>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NegativeInt>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<NegativeInt>
```

Added in v0.0.1

# Model

## NegativeInt (type alias)

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

**Signature**

```ts
export type NegativeInt = number & NegativeIntBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, number, NegativeInt>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NegativeInt>
```

Added in v0.0.1

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, number, NegativeInt>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeInt>
```

Added in v0.0.1

# Refinements

## isNegativeInt

**Signature**

```ts
export declare function isNegativeInt(n: number): n is NegativeInt
```

Added in v0.0.1
