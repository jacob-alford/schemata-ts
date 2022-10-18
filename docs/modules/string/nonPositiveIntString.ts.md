---
title: string/nonPositiveIntString.ts
nav_order: 42
parent: Modules
---

## nonPositiveIntString overview

NonPositive integer branded newtype string.

Represents integer strings which are negative or zero.

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
  - [NonPositiveIntString (type alias)](#nonpositiveintstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonPositiveIntString](#isnonpositiveintstring)
- [Utilities](#utilities)
  - [toNonPositiveInt](#tononpositiveint)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<NonPositiveIntString>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonPositiveIntString>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, NonPositiveIntString>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonPositiveIntString>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonPositiveIntString>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonPositiveIntString>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: t.Type<NonPositiveIntString>
```

Added in v0.0.4

# Model

## NonPositiveIntString (type alias)

NonPositive integer branded newtype string.

Represents integer strings which are negative or zero.

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
```

**Signature**

```ts
export type NonPositiveIntString = string & NonPositiveIntStringBrand
```

Added in v0.0.4

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, NonPositiveIntString>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveIntString>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NonPositiveIntString>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveIntString>
```

Added in v0.0.4

# Refinements

## isNonPositiveIntString

**Signature**

```ts
export declare const isNonPositiveIntString: (s: string) => s is NonPositiveIntString
```

Added in v0.0.4

# Utilities

## toNonPositiveInt

**Signature**

```ts
export declare const toNonPositiveInt: (s: NonPositiveIntString) => NonPositiveInt.NonPositiveInt
```

Added in v0.0.4
