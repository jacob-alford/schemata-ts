---
title: string/NonPositiveFloatString.ts
nav_order: 40
parent: Modules
---

## NonPositiveFloatString overview

Non-positive floating point branded newtype string.

Represents non-positive floating point number strings:

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
  - [NonPositiveFloatString (type alias)](#nonpositivefloatstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonPositiveFloatString](#isnonpositivefloatstring)
- [Utilities](#utilities)
  - [toNonPositiveFloat](#tononpositivefloat)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NonPositiveFloatString>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonPositiveFloatString>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, NonPositiveFloatString>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonPositiveFloatString>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonPositiveFloatString>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonPositiveFloatString>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: t.Type<NonPositiveFloatString>
```

Added in v0.0.4

# Model

## NonPositiveFloatString (type alias)

Non-positive floating point branded newtype string.

Represents non-positive floating point number strings:

```math
 { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
```

**Signature**

```ts
export type NonPositiveFloatString = string & NonPositiveFloatStringBrand
```

Added in v0.0.4

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, NonPositiveFloatString>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveFloatString>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NonPositiveFloatString>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveFloatString>
```

Added in v0.0.4

# Refinements

## isNonPositiveFloatString

**Signature**

```ts
export declare const isNonPositiveFloatString: (s: string) => s is NonPositiveFloatString
```

Added in v0.0.4

# Utilities

## toNonPositiveFloat

**Signature**

```ts
export declare const toNonPositiveFloat: (s: NonPositiveFloatString) => NonPositiveFloat.NonPositiveFloat
```

Added in v0.0.4
