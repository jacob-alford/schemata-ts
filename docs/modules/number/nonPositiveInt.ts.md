---
title: number/nonPositiveInt.ts
nav_order: 18
parent: Modules
---

## nonPositiveInt overview

NonPositive integer branded newtype.

Represents integers which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
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
  - [NonPositiveInt (type alias)](#nonpositiveint-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonPositiveInt](#isnonpositiveint)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NonPositiveInt>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonPositiveInt>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<number, NonPositiveInt>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonPositiveInt>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonPositiveInt>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonPositiveInt>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: t.Type<NonPositiveInt>
```

Added in v0.0.4

# Model

## NonPositiveInt (type alias)

NonPositive integer branded newtype.

Represents integers which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
```

**Signature**

```ts
export type NonPositiveInt = number & NonPositiveIntBrand
```

Added in v0.0.4

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, number, NonPositiveInt>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveInt>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, number, NonPositiveInt>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveInt>
```

Added in v0.0.4

# Refinements

## isNonPositiveInt

**Signature**

```ts
export declare const isNonPositiveInt: (n: number) => n is NonPositiveInt
```

Added in v0.0.4
