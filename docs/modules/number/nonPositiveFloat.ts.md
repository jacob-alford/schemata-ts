---
title: number/nonPositiveFloat.ts
nav_order: 17
parent: Modules
---

## nonPositiveFloat overview

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

Added in v0.0.4

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
  - [NonPositiveFloat (type alias)](#nonpositivefloat-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonPositiveFloat](#isnonpositivefloat)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NonPositiveFloat>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonPositiveFloat>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<number, NonPositiveFloat>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonPositiveFloat>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonPositiveFloat>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonPositiveFloat>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: t.Type<NonPositiveFloat>
```

Added in v0.0.4

# Model

## NonPositiveFloat (type alias)

Non-positive floating point branded newtype.

Represents non-positive floating point numbers:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export type NonPositiveFloat = number & NonPositiveFloatBrand
```

Added in v0.0.4

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, number, NonPositiveFloat>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveFloat>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, number, NonPositiveFloat>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveFloat>
```

Added in v0.0.4

# Refinements

## isNonPositiveFloat

**Signature**

```ts
export declare const isNonPositiveFloat: (n: number) => n is NonPositiveFloat
```

Added in v0.0.4
