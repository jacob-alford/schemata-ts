---
title: string/NaturalString.ts
nav_order: 23
parent: Modules
---

## NaturalString overview

Natural branded newtype string.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [toNatural](#tonatural)
- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [NaturalString (type alias)](#naturalstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNaturalString](#isnaturalstring)

---

# Destructors

## toNatural

**Signature**

```ts
export declare const toNatural: (n: NaturalString) => Natural
```

Added in v0.0.1

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NaturalString>
```

Added in v0.0.1

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NaturalString>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NaturalString>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NaturalString>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<NaturalString>
```

Added in v0.0.1

# Model

## NaturalString (type alias)

Natural branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type NaturalString = string & NaturalStringBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, NaturalString>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NaturalString>
```

Added in v0.0.1

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NaturalString>
```

Added in v0.0.1

# Refinements

## isNaturalString

**Signature**

```ts
export declare const isNaturalString: (n: string) => n is NaturalString
```

Added in v0.0.1
