---
title: string/PositiveFloatString.ts
nav_order: 26
parent: Modules
---

## PositiveFloatString overview

Positive floating point branded newtype string.

Represents positive floating point numbers:

```math
 { f | f ∈ ℝ, f > 0, f <= 2 ** 53 - 1 }
```

Added in v0.0.2

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [PositiveFloatString (type alias)](#positivefloatstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isPositiveFloatString](#ispositivefloatstring)
- [Utilities](#utilities)
  - [toPositiveFloat](#topositivefloat)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, PositiveFloatString>
```

Added in v0.0.2

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<PositiveFloatString>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, PositiveFloatString>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, PositiveFloatString>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<PositiveFloatString>
```

Added in v0.0.2

# Model

## PositiveFloatString (type alias)

Positive floating point branded newtype string.

Represents positive floating point numbers:

```math
 { f | f ∈ ℝ, f > 0, f <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type PositiveFloatString = string & PositiveFloatStringBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, PositiveFloatString>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, PositiveFloatString>
```

Added in v0.0.2

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveFloatString>
```

Added in v0.0.2

# Refinements

## isPositiveFloatString

**Signature**

```ts
export declare const isPositiveFloatString: (s: string) => s is PositiveFloatString
```

Added in v0.0.2

# Utilities

## toPositiveFloat

**Signature**

```ts
export declare const toPositiveFloat: (s: PositiveFloatString) => PositiveFloat
```

Added in v0.0.2
