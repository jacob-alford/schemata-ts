---
title: string/PositiveIntString.ts
nav_order: 39
parent: Modules
---

## PositiveIntString overview

Positive integer branded newtype string.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [toPositiveInt](#topositiveint)
- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [PositiveIntString (type alias)](#positiveintstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isPositiveIntString](#ispositiveintstring)

---

# Destructors

## toPositiveInt

**Signature**

```ts
export declare const toPositiveInt: (n: PositiveIntString) => PositiveInt.PositiveInt
```

Added in v0.0.1

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<PositiveIntString>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, PositiveIntString>
```

Added in v0.0.1

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, PositiveIntString>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<PositiveIntString>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, PositiveIntString>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, PositiveIntString>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<PositiveIntString>
```

Added in v0.0.1

# Model

## PositiveIntString (type alias)

Positive integer branded newtype.

Represents positive integers:

```math
 { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type PositiveIntString = string & PositiveIntStringBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, PositiveIntString>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, PositiveIntString>
```

Added in v0.0.1

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, PositiveIntString>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveIntString>
```

Added in v0.0.1

# Refinements

## isPositiveIntString

**Signature**

```ts
export declare function isPositiveIntString(n: string): n is PositiveIntString
```

Added in v0.0.1
