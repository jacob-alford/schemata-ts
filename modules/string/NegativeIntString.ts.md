---
title: string/NegativeIntString.ts
nav_order: 31
parent: Modules
---

## NegativeIntString overview

Negative integer branded newtype string.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [toNegativeInt](#tonegativeint)
- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [NegativeIntString (type alias)](#negativeintstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNegativeIntString](#isnegativeintstring)

---

# Destructors

## toNegativeInt

**Signature**

```ts
export declare const toNegativeInt: (s: NegativeIntString) => NegativeInt.NegativeInt
```

Added in v0.0.1

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NegativeIntString>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NegativeIntString>
```

Added in v0.0.1

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, NegativeIntString>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NegativeIntString>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NegativeIntString>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NegativeIntString>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<NegativeIntString>
```

Added in v0.0.1

# Model

## NegativeIntString (type alias)

Negative integer branded newtype.

Represents negative integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
```

**Signature**

```ts
export type NegativeIntString = string & NegativeIntStringBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, NegativeIntString>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NegativeIntString>
```

Added in v0.0.1

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NegativeIntString>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeIntString>
```

Added in v0.0.1

# Refinements

## isNegativeIntString

**Signature**

```ts
export declare const isNegativeIntString: (n: string) => n is NegativeIntString
```

Added in v0.0.1
