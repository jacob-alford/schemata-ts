---
title: number/negativeFloat.ts
nav_order: 14
parent: Modules
---

## negativeFloat overview

Negative floating point branded newtype.

Represents negative floating point numbers:

```math
 { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
```

Added in v0.0.2

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
  - [NegativeFloat (type alias)](#negativefloat-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNegativeFloat](#isnegativefloat)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NegativeFloat>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NegativeFloat>
```

Added in v0.0.2

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<number, NegativeFloat>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NegativeFloat>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NegativeFloat>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NegativeFloat>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<NegativeFloat>
```

Added in v0.0.2

# Model

## NegativeFloat (type alias)

Negative floating point branded newtype.

Represents negative floating point numbers:

```math
 { f | f ∈ ℝ, f < 0, f >= Number.MAX_VALUE }
```

**Signature**

```ts
export type NegativeFloat = number & NegativeFloatBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, number, NegativeFloat>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NegativeFloat>
```

Added in v0.0.2

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, number, NegativeFloat>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeFloat>
```

Added in v0.0.2

# Refinements

## isNegativeFloat

**Signature**

```ts
export declare const isNegativeFloat: (f: number) => f is NegativeFloat
```

Added in v0.0.2
