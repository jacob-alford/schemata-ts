---
title: string/negativeFloatString.ts
nav_order: 36
parent: Modules
---

## negativeFloatString overview

Negative floating point branded newtype string.

Represents negative floating point number strings:

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
  - [NegativeFloatString (type alias)](#negativefloatstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNegativeFloatString](#isnegativefloatstring)
- [Utilities](#utilities)
  - [toNegativeFloat](#tonegativefloat)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NegativeFloatString>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NegativeFloatString>
```

Added in v0.0.2

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, NegativeFloatString>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NegativeFloatString>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NegativeFloatString>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NegativeFloatString>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<NegativeFloatString>
```

Added in v0.0.2

# Model

## NegativeFloatString (type alias)

Negative floating point branded newtype string.

Represents negative floating point number strings:

```math
 { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export type NegativeFloatString = string & NegativeFloatStringBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, NegativeFloatString>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NegativeFloatString>
```

Added in v0.0.2

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NegativeFloatString>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeFloatString>
```

Added in v0.0.2

# Refinements

## isNegativeFloatString

**Signature**

```ts
export declare const isNegativeFloatString: (s: string) => s is NegativeFloatString
```

Added in v0.0.2

# Utilities

## toNegativeFloat

**Signature**

```ts
export declare const toNegativeFloat: (s: NegativeFloatString) => NegativeFloat.NegativeFloat
```

Added in v0.0.2
