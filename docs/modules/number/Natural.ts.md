---
title: number/Natural.ts
nav_order: 7
parent: Modules
---

## Natural overview

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [Natural (type alias)](#natural-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNatural](#isnatural)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, Natural>
```

Added in v0.0.1

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<Natural>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, Natural>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, Natural>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<Natural>
```

Added in v0.0.1

# Model

## Natural (type alias)

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type Natural = number & NaturalBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, Natural>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, Natural>
```

Added in v0.0.1

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Natural>
```

Added in v0.0.1

# Refinements

## isNatural

**Signature**

```ts
export declare function isNatural(n: number): n is Natural
```

Added in v0.0.1
